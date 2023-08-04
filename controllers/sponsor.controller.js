import sponsorModel from "../models/sponsor.model.js";

import dotenv from "dotenv";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

import validator from "validator";

import { addTask } from "./taskSendInvitation.controller.js";
// import puppeteer from "puppeteer";

dotenv.config();

export const register = async (req, res, next) => {
  var id = null;
  id = nanoid();
  req.body._id = id;

  if (
    !req.body.fullName ||
    !req.body.phone ||
    !req.body.gender ||
    !req.body.unit ||
    !req.body.pack ||
    !req.body.role
  ) {
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
  const newSponsor = new sponsorModel(req.body);
  newSponsor
    .save()
    .then(async (result) => {
      res.status(200).json({
        success: true,
        code: 0,
        message: "Đăng kí  thành công !",
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
};

export const getAll = async (req, res) => {
  try {
 
    const users = await sponsorModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

export const getById = async (req, res) => {
  try {
    if (req.params.id) {
      sponsorModel
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
