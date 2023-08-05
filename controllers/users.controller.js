import userModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import { nanoid } from "../config/nanoid.js";

dotenv.config();

export const register = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      success: false,
      code: -1,
      message: "Thiếu trường dữ liệu !",
    });
  }
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({
      success: false,
      code: -1,
      message: "Email không hợp lệ !",
    });
  }
  userModel
    .find({
      email: req.body.email,
    })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          success: false,
          message: "Email đã có người sử dụng",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              success: false,
              code: -100,
              message: "Có lỗi khi tạo người dùng",
            });
          } else {
            const user = new userModel({
              _id: nanoid(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  success: true,
                  code: 0,
                  message: "Tạo người dùng thành công",
                  data: {
                    id: result._id,
                    email: result.email,
                  },
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: true,
                  success: false,
                  code: -100,
                });
              });
          }
        });
      }
    });
};
export const login = async (req, res) => {
  userModel
    .find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          success: false,
          message: "Tài khoản không tồn tại !",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false,
            code: -100,
            message: "Sai mật khẩu",
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user[0].email, id: user[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: "100h",
            }
          );
          return res.status(200).json({
            success: true,
            code: 0,
            message: "Đăng nhập thành công",
            data: {
              id: user[0]._id,
              role: user[0].role,
              email: user[0].email,
              token: token,
            },
          });
        }
        return res.status(401).json({
          success: false,
          code: -100,
          message: "Sai mật khẩu",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
};

export const remove = async (req, res) => {
  userModel
    .remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        error: false,
        message: " user deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
      });
    });
};
export const getAll = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ error: false, data: users });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

export const changePassword = async (req, res) => {
  const user = await userModel.find({ username: req.body.username });
  if (user.length < 1) {
    return res.status(404).json({
      message: "Sai tên đăng nhập",
    });
  }
  bcrypt.compare(req.body.password, user[0].password, (err, result) => {
    if (err) {
      return res.status(401).json({
        message: "Có lỗi khi xác thực",
      });
    }
    if (result) {
      bcrypt
        .hash(req.body.newPassword, 10)
        .then((result) => {
          userModel
            .updateOne(
              { _id: user[0]._id },
              { $set: { password: result } },
              { new: true }
            )
            .then((result) => {
              return res
                .status(200)
                .json({ error: false, message: "Đổi mật khẩu thành công" });
            })
            .catch((error) => {
              return res.status(500).json({
                error: true,
                message: "Không cập nhật được mật khẩu",
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            error: true,
            message: "Không cập nhật được mật khẩu",
          });
        });
    } else {
      return res.status(500).json({
        error: true,
        message: "Sai mật khẩu",
      });
    }
  });
};
