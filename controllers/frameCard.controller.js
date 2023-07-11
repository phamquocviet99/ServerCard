import frameCardModel from "../models/frameCard.model.js";

export const post = async (req, res) => {
  try {
    if (!req.body.nameUser || !req.body.image.name || !req.body.image.url) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Thiếu trường dữ liệu !",
      });
    }
    const feedBack = new frameCardModel(req.body);
    await feedBack
      .save()
      .then((result) => {
        res.status(200).send({
          success: true,
          code: 0,
          message: "Tạo template thành công công góp ý !",
          data: {
            id: result.id,
            nameUser: result.nameUser,
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
    res
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
