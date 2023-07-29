import userModel from "../models/users.join.model.js";
import excel from "excel4node";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

export const register = async (req, res, next) => {
  if (!req.body.fullName || !req.body.phone) {
    return res.status(400).send({
      success: false,
      code: -1,
      message: "Thiếu trường dữ liệu !",
    });
  }
  req.body._id = nanoid();
  const user = new userModel(req.body);
  user
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        code: 0,
        message: "Đăng kí tham gia thành công !",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        success: false,
        code: -100,
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
