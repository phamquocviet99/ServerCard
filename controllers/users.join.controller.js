import userModel from "../models/users.join.model.js";
import excel from "excel4node";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import base64Img from "base64-img";
import qr from "qrcode";
import { templateEmail } from "../template/templateEmail.js";
import { uploadS3Base64, uploadS3Buffer } from "../middleware/AWS_S3.js";
import validator from "validator";
import nodeHtmlToImage from "node-html-to-image";
import puppeteer from "puppeteer";

dotenv.config();
const user = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASSWORD;
const service = process.env.MAIL_SERVICE;
const bucketQRCODE = process.env.AWS_BUCKET_QRCODE;
export const register = async (req, res, next) => {
  var id = null;
  var urlQRCode = null;
  id = nanoid();
  req.body._id = id;

  if (!req.body.fullName || !req.body.phone) {
    return res.status(400).send({
      success: false,
      code: -1,
      message: "Thiếu trường dữ liệu !",
    });
  }
  if (req.body.email) {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Email không hợp lệ !",
      });
    }
  }

  await getUrlQRCode(id)
    .then((url) => (urlQRCode = url))
    .catch((error) => {
      return res.status(500).send({
        success: false,
        code: -1,
        message: "Có lỗi trong quá trình tạo QR",
      });
    });

  const data = {
    id: id,
    fullName: req.body.fullName,
    urlQRcode: urlQRCode,
    email: req.body.email,
  };
  console.time(`TIME-PROCESS`);
  // await getUrlInvitation(data)
  //   .then((url) => (urlInvitation = url))
  //   .catch((err) => {
  //     return res.status(500).send({
  //       success: false,
  //       code: -1,
  //       message: "Có lỗi trong quá trình tạo thiệp mời",
  //     });
  //   });

  // await sendEmail(data).catch((err) => {
  //   return res.status(500).send({
  //     success: false,
  //     code: -1,
  //     message: "Có lỗi trong quá trình tạo email",
  //   });
  // });

  const [urlInvitationResult, resultEmail] = await Promise.all([
    getUrlInvitation2(data),
    sendEmail(data),
  ]);
  console.timeEnd(`TIME-PROCESS`);

  req.body.urlInvitation = urlInvitationResult;
  req.body.urlQRcode = urlQRCode;
  const user = new userModel(req.body);
  user
    .save()
    .then(async (result) => {
      return res.status(200).json({
        success: true,
        code: 0,
        message: "Đăng kí tham gia thành công !",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        success: false,
        code: 500,
      });
    });
};
export const getAll = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

export const sendEmail = (data) => {
  try {
    if (!data.email) return;
    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: password,
      },
    });
    let message = {
      from: user,
      to: data.email,
      subject: "Thư mời tham gia lễ ra mắt Sàn Hoa FMP",
      html: templateEmail(data),
    };
    return new Promise(function (resolve, reject) {
      transporter
        .sendMail(message)
        .catch((error) => {
          reject(new Error(error));
        })
        .then((result) => {
          resolve(result);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (req, res) => {
  try {
    if (req.params.id) {
      userModel
        .findById({ _id: req.params.id })
        .then((result) => {
          if (result) {
            return res.status(200).send({
              success: true,
              code: 0,
              message: "Thành công",
              data: result,
            });
          } else {
            return res.status(200).send({
              success: false,
              code: -1,
              message: "Không tìm thấy đối tượng",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            error: error.message,
            message: "Không tìm thấy ID",
            success: false,
          });
        });
    } else {
      return res.status(200).send({
        success: false,
        code: -1,
        message: "URL không hợp lệ",
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      code: -1,
      message: err.message,
    });
  }
};

export const download = async (req, res, next) => {
  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Danh sách người tham gia");

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  worksheet
    .cell(1, 1)
    .string("Danh sách người đăng kí tham gia")
    .style({
      font: {
        color: "#0066FF",
        size: 24,
      },
    });
  worksheet
    .cell(2, 1)
    .string("STT")
    .style({
      font: {
        size: 12,
      },
    });
  worksheet
    .cell(2, 2)
    .string("Họ và tên")
    .style({
      font: {
        size: 12,
      },
    });
  worksheet
    .cell(2, 3)
    .string("Email")
    .style({
      font: {
        size: 12,
      },
    });
  worksheet
    .cell(2, 4)
    .string("Số điện thoại")
    .style({
      font: {
        size: 12,
      },
    });
  const listUser = await userModel.find();
  for (let i = 0; i < listUser.length; i++) {
    worksheet
      .cell(i + 3, 1)
      .number(i + 1)
      .style({
        font: {
          size: 12,
        },
      });
    worksheet
      .cell(i + 3, 2)
      .string(listUser[i].fullName)
      .style({
        font: {
          size: 12,
        },
      });
    worksheet
      .cell(i + 3, 3)
      .string(listUser[i].email)
      .style({
        font: {
          size: 12,
        },
      });
    worksheet
      .cell(i + 3, 4)
      .string(listUser[i].phone)
      .style({
        font: {
          size: 12,
        },
      });
  }
  workbook.write("./uploads/Excel.xlsx");
  res.download("./uploads/Excel.xlsx", (err) => {
    if (err) {
      console.error("Lỗi khi gửi file:", err);
      res.status(500).send("Có lỗi xảy ra khi tải file.");
    }
  });
};
export const updateCheckin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Thiếu trường dữ liệu !",
      });
    }
    if (req.params.id) {
      userModel
        .findById({ _id: req.params.id })
        .then((result) => {
          result.isCheckIn = true;
          result
            .save()
            .then((r) => {
              return res.status(200).send({
                success: true,
                code: 0,
                message: "Thành công",
                data: r,
              });
            })
            .catch((err) => {
              return res.status(500).send({
                success: false,
                code: -1,
                message: err.message,
              });
            });
        })
        .catch((error) => {
          return res.status(400).json({
            error: error.message,
            message: "Không tìm thấy ID",
            success: false,
          });
        });
    } else {
      return res.status(200).send({
        success: false,
        code: -1,
        message: "URL không hợp lệ",
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      code: -1,
      message: err.message,
    });
  }
};

function getUrlQRCode(id) {
  return new Promise(function (resolve, reject) {
    qr.toDataURL(id)
      .then(async (result) => {
        const data = await uploadS3Base64(
          bucketQRCODE,
          "QRCode",
          id + "/" + "QR.jpeg",
          result
        );
        data.success ? resolve(data.url) : reject(new Error(data.error));
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function getUrlInvitation(data) {
  return new Promise(function (resolve, reject) {
    nodeHtmlToImage({
      html: templateEmail(data),
      quantity: 20,
    })
      .then(async (result) => {
        const resultUrl = await uploadS3Buffer(
          bucketQRCODE,
          "invitation",
          nanoid() + "/" + "invitation.jpeg",
          result
        );
        resultUrl.success
          ? resolve(resultUrl.url)
          : reject(new Error(resultUrl.error));
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function getUrlInvitation2(data) {
  return new Promise(async function (resolve, reject) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(templateEmail(data));
    page
      .screenshot()
      .then(async (result) => {
        const resultUrl = await uploadS3Buffer(
          bucketQRCODE,
          "invitation",
          nanoid() + "/" + "invitation.jpeg",
          result
        );
        resultUrl.success
          ? resolve(resultUrl.url)
          : reject(new Error(resultUrl.error));
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

// async function getU(data) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(templateEmail(data));
//   await page.screenshot().then((r) => console.log(r));

//   await browser.close();
// }
