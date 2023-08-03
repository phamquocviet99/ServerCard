import taskSendInvitationModel from "../models/taskSendInvitation.model.js";
import usersJoinModel from "../models/users.join.model.js";
import nodemailer from "nodemailer";
import qr from "qrcode";
import { templateEmail } from "../template/templateEmail.js";
const user = process.env.GMAIL_USER;
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
      taskSend.push(sendEmail(listEmailNotSend[i]._id));
    }
    Promise.all(taskSend)
      .then((results) => {
        console.log("All tasks completed successfully:");
        // results.forEach((result) => {
        //   console.log(result);
        // });
      })
      .catch((error) => {
        console.error("Some tasks failed:");
        // console.error(error);
      });
  } catch (error) {}
};

export async function sendEmail(id) {
  try {
    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: password,
      },
    });
    const userData = await usersJoinModel.findById({ _id: id });
    let message = {
      from: user,
      to: userData.email,
      subject: "Thư mời tham gia lễ ra mắt Sàn Hoa FMP",
      html: templateEmail(userData),
    };
    return new Promise(function (resolve, reject) {
      transporter
        .sendMail(message)
        .catch((error) => {
          reject(new Error(error));
          update(userData._id, {
            isErrorEmail: true,
          });
        })
        .then((result) => {
          update(userData._id, {
            isSentEmail: true,
          });
          resolve(result);
        });
    });
  } catch (error) {
    new Error(err);
  }
}

export const update = async (id, data) => {
  if (!id) return;
  await taskSendInvitationModel
    .updateOne({ _id: id }, data)
    .then((result) => {})
    .catch((err) => new Error(err));
};
