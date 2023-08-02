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

dotenv.config();
const user = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASSWORD;
const service = process.env.MAIL_SERVICE;
const bucketQRCODE = process.env.AWS_BUCKET_QRCODE;
export const register = async (req, res, next) => {
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

  req.body._id = nanoid();
  const dataImage = await generateQRCodeBase64(req.body._id);
  if (!dataImage.success) {
    return res.status(405).json({
      error: dataImage.error,
      success: false,
      code: 500,
    });
  }

  const resultImage = await uploadS3Base64(
    bucketQRCODE,
    "QRCode",
    req.body._id + "/" + "QR.jpeg",
    dataImage.code
  );
  if (!resultImage.success) {
    return res.status(405).json({
      error: resultImage.error,
      success: false,
      code: 500,
    });
  }
  const data = {
    fullName: req.body.fullName,
    urlQRcode: resultImage.url,
  };
  const bufferInvitation = await nodeHtmlToImage({
    html: templateEmail(data),
    quantity: 80,
  });
  const resultInvitation = await uploadS3Buffer(
    bucketQRCODE,
    "invitation",
    req.body._id + "/" + "invitation.jpeg",
    bufferInvitation
  );
  if (!resultInvitation.success) {
    return res.status(405).json({
      error: resultImage.error,
      success: false,
      code: 500,
    });
  }
  req.body.urlInvitation = resultInvitation.url;
  req.body.urlQRcode = resultImage.url;
  const user = new userModel(req.body);
  user
    .save()
    .then(async (result) => {
      if (req.body.email) {
        await sendEmail(result, res);
      } else {
        return res.status(200).json({
          success: true,
          code: 0,
          message: "Đăng kí tham gia thành công !",
          data: result,
        });
      }
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

export const sendEmail = async (data, res) => {
  try {
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

    await transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          success: true,
          code: 0,
          message: "Đăng kí tham gia thành công !",
          data: data,
        });
      })
      .catch((er) => {
        return res.status(500).json({
          error: er,

          success: false,
        });
      });
  } catch (err) {
    return res.status(500).json({
      error: er,
      success: false,
      code: -500,
    });
  }
};

async function generateQRCodeBase64(data) {
  try {
    const qrDataURL = await qr.toDataURL(data);
    return {
      success: true,
      code: qrDataURL,
    };
  } catch (err) {
    return {
      error: err,
      success: false,
      code: null,
    };
  }
}

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
