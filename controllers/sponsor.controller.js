import userModel from "../models/users.join.model.js";
import excel from "excel4node";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
// import base64Img from "base64-img";
import qr from "qrcode";
import { templateEmail } from "../template/templateEmail.js";
import { uploadS3Base64, uploadS3Buffer } from "../middleware/AWS_S3.js";
import validator from "validator";
import nodeHtmlToImage from "node-html-to-image";
import { addTask } from "./taskSendInvitation.controller.js";
// import puppeteer from "puppeteer";

dotenv.config();
const user = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASSWORD;
const service = process.env.MAIL_SERVICE;
const bucketQRCODE = process.env.AWS_BUCKET_QRCODE;
export const register = async (req, res, next) => {
  var id = null;
  id = nanoid();
  req.body._id = id;

  if (!req.body.fullName || !req.body.phone || !req.body.gender) {
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

  req.body.urlQRcode = "urlQRCode";
  const user = new userModel(req.body);
  user
    .save()
    .then(async (result) => {
      res.status(200).json({
        success: true,
        code: 0,
        message: "Đăng kí tham gia thành công !",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
        code: 500,
      });
    });
  addTask({
    _id: id,
    email: req.body.email ? req.body.email : null,
    zalo: req.body.phone,
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





