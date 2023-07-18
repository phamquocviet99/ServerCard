import { uploadS3 } from "../middleware/AWS_S3.js";
import frameCardModel from "../models/frameCard.model.js";
import { v4 as uuid } from "uuid";

export const post = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Thiếu trường dữ liệu !",
      });
    }
    const id = uuid();

    const resultImage = await uploadS3(
      "avatar",
      id + "/" + "avatar." + file.mimetype.split("/")[1],
      file
    );
    if (!resultImage.success) {
      return res.status(500).json({
        error: resultImage.error,
        message: "Có lỗi trong quá trình upload ảnh",
        success: false,
      });
    }
    const frameCard = new frameCardModel({
      _id: id,
      image: resultImage.url,
      features: req.body.features,
    });
    await frameCard
      .save()
      .then((result) => {
        res.status(200).send({
          success: true,
          code: 0,
          message: "Tạo template thành công công góp ý !",
          data: {
            id: result.id,
            image: result.image,
            features: result.features,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "Có lỗi trong quá trình thực hiện",
          success: false,
        });
      });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Không thành công", success: false });
  }
};

export const get = async (req, res) => {
  try {
    await frameCardModel
      .find()
      .then((result) => {
        return res.status(200).send({
          success: true,
          code: 0,
          message: "Thành công",
          data: result,
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ error: error, message: "Không thành công", success: false });
      });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};

export const findById = async (req, res) => {
  try {
    if (req.params.id) {
      frameCardModel
        .findById({ _id: req.params.id })
        .then((result) => {
          result.views += 1;
          result.save();
          return res.status(200).send({
            success: true,
            code: 0,
            message: "Thành công",
            data: result,
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error.message,
            message: "Không tìm thấy ID",
            success: false,
          });
        });
    } else {
      res.status(200).send({
        success: false,
        code: -1,
        message: "URL không hợp lệ",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
export const download = async (req, res) => {
  try {
    if (req.params.id) {
      frameCardModel
        .findById({ _id: req.params.id })
        .then((result) => {
          result.downloads += 1;
          result.save();
          return res.status(200).send({
            success: true,
            code: 0,
            message: "Thành công",
            data: result,
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error.message,
            message: "Không tìm thấy ID",
            success: false,
          });
        });
    } else {
      res.status(200).send({
        success: false,
        code: -1,
        message: "URL không hợp lệ",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
