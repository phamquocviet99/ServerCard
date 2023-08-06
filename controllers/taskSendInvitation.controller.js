import taskSendInvitationModel from "../models/taskSendInvitation.model.js";
import usersJoinModel from "../models/users.join.model.js";
import nodemailer from "nodemailer";
import { templateEmail } from "../template/templateEmail.js";
import axiosClient from "../api/axiosClient.js";
import { genBase64ImageInvitation } from "./genQRcode.controller.js";
const user = process.env.GMAIL_USER;
const keyZalo = process.env.API_ZALO_KEY;
const password = process.env.GMAIL_PASSWORD;
const service = process.env.MAIL_SERVICE;
export const addTask = async (data) => {
  try {
    const task = new taskSendInvitationModel(data);
    return new Promise(function (resolve, reject) {
      task
        .save()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(new Error(err)));
    });
  } catch (error) {
    return new Error(error);
  }
};

export const checkSendEmail = async () => {
  try {
    var taskSend = [];
    const listEmailNotSend = await taskSendInvitationModel.find({
      isSentEmail: false,
      isErrorEmail: false,
    });

    for (let i = 0; i < listEmailNotSend.length; i++) {
      await sendEmail(listEmailNotSend[i]._id)
        .catch((err) => {
          console.error("Lỗi ", listEmailNotSend[i]._id, err);
        })
        .then((r) => {
          console.log(
            ` ${listEmailNotSend[i]._id} tasks send email successfully`
          );
        });
    }
    try {
      var taskSend = [];
      const listEmailNotSend = await taskSendInvitationModel.find({
        isSentEmail: false,
        isErrorEmail: false,
      });
      for (let i = 0; i < listEmailNotSend.length; i++) {
        taskSend.push(
          sendEmail(listEmailNotSend[i].uid, listEmailNotSend[i]._id)
        );
      }
      Promise.all(taskSend)
        .then((results) => {
          console.log(
            ` ${listEmailNotSend.length} tasks send email successfully`
          );
          results.forEach((element) => {
            console.error(element);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {}
};

export const checkSendZalo = async () => {
  try {
    var taskSend = [];
    const listZaloNotSend = await taskSendInvitationModel.find({
      isSentZalo: false,
      isErrorZalo: false,
    });
    for (let i = 0; i < listZaloNotSend.length; i++) {
      taskSend.push(sendZalo(listZaloNotSend[i].uid, listZaloNotSend[i]._id));
    }
    Promise.all(taskSend)
      .then((results) => {
        console.log(` ${listZaloNotSend.length} tasks send zalo successfully`);
        results.forEach((element) => {
          console.error(element);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export async function sendEmail(id, tid) {
  try {
    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: password,
      },
    });
    const userE = await usersJoinModel.find({ _id: id });
    const userData = userE[0];
    if (!userData) return new Error("Không tìm thấy đối tượng");
    let message = {
      from: {
        name: "Công Ty Cổ Phần FLOWER MARKETPLACE - FMP",
        address: "event@sanhoa.vn",
      },
      to: userData.email,
      subject: "Thư mời tham gia lễ ra mắt Sàn Hoa FMP",
      html: templateEmail(userData),
    };
    return new Promise(function (resolve, reject) {
      transporter
        .sendMail(message)
        .catch((error) => {
          reject(new Error(error));
          console.error(error);
          update(tid, {
            isErrorEmail: true,
          });
        })
        .then((result) => {
          update(tid, {
            isSentEmail: true,
          });
          resolve(result);
        });
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function sendZalo(id, tid) {
  try {
    var dataImage = null;
    const userZ = await usersJoinModel.find({ _id: id });
    const userData = userZ[0];
    if (!userData) return new Error("Không tìm thấy đối tượng");

    await genBase64ImageInvitation(userData)
      .then((base64) => {
        dataImage = base64.replace(/^data:image\/\w+;base64,/, "");
      })
      .catch((error) => {
        return new Error("Không thể tạo thiệp mời", error);
      });
    let listMessage = [
      {
        type: "text",
        data: {
          phone: userData.phone,
          apiKey: keyZalo,
          message: `Cảm ơn quý ${userData.gender === "male" ? "ông" : "bà"} ${
            userData.fullName
          } đã đăng kí tham gia sự kiện lễ ra mắt Sàn Hoa FMP !`,
        },
      },

      {
        type: "photo",
        data: {
          phone: userData.phone,
          apiKey: keyZalo,
          message: ``,
          imgBase64: dataImage,
        },
      },
    ];
    return new Promise(async function (resolve, reject) {
      if (!userData.phone) resolve();
      var error = false;
      for (var mess of listMessage) {
        if (error) break;
        if (mess.type === "text") {
          await sendTextZalo(mess.data).catch((err) => {
            error = true;
            update(tid, {
              isErrorZalo: true,
              errorZalo: err,
            });
            reject(err);
          });
        } else {
          await sendPhotoZalo(mess.data).catch((err) => {
            error = true;
            update(tid, {
              isErrorZalo: true,
              errorZalo: err,
            });
            reject(err);
          });
        }
      }
      await update(tid, {
        isSentZalo: true,
      });
    });
  } catch (error) {
    update(tid, {
      isErrorZalo: true,
      errorZalo: err,
    });
    console.error(error);
  }
}

export function sendTextZalo(data) {
  try {
    return new Promise(async function (resolve, reject) {
      await axiosClient
        .post("/zalo/send-text", JSON.stringify(data))
        .then((result) => {
          result.success ? resolve(true) : reject(result.message);
        })
        .catch((error) => {
          console.log("Lỗi gửi zalo" + error);
          reject(console.log("Lỗi gửi zalo" + error));
        });
    });
  } catch (error) {
    console.log("Lỗi gửi zalo" + error);
    return console.log("Lỗi gửi zalo" + error);
  }
}
export function sendPhotoZalo(data) {
  try {
    return new Promise(async function (resolve, reject) {
      await axiosClient
        .post("/zalo/send-photo", JSON.stringify(data))
        .then((result) => {
          result.success ? resolve(true) : reject(result.message);
        })
        .catch((error) => {
          console.log("Lỗi gửi zalo" + error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Lỗi gửi zalo" + error);
    return new Error(error);
  }
}

export const update = async (id, data) => {
  if (!id) return;
  await taskSendInvitationModel
    .updateOne({ _id: id }, data)
    .then((result) => {
      console.log(`${id} đã được cập nhật`);
    })
    .catch((err) => {
      console.error(err);
    });
};
