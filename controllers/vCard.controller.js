import { deleteS3, uploadS3 } from "../middleware/AWS_S3.js";
import decodeJWT from "../middleware/decodeJwt.js";
import vCardModel from "../models/vCard.model.js";
import validator from "validator";
import { v4 as uuid } from "uuid";
export const post = async (req, res) => {
  try {
    const dataUser = decodeJWT(req, res);
    const file = req.file;

    if (!file) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Thiếu trường dữ liệu !",
      });
    }

    if (
      !req.body.nameUser ||
      !req.body.nameCard ||
      !req.body.nameCompany ||
      !req.body.email ||
      !req.body.position ||
      !req.body.phone ||
      !req.body.location
    ) {
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

    if (req.body.phone) {
      if (
        !validator.isMobilePhone(req.body.phone) ||
        req.body.phone.length <= 8
      ) {
        return res.status(400).send({
          success: false,
          code: -1,
          message: "Số điện thoại không hợp lệ !",
        });
      }
    }
    if (req.body.nameUser.match(/[-!@#$%^&*(),.?":{}|<>]/)) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Tên người không hợp lệ !",
      });
    }
    const id = uuid();
    const resultImage = await uploadS3(
      "v-card",
      id + "/" + "v-card.avatar.jpeg",
      file
    );

    if (!resultImage.success) {
      return res.status(500).json({
        error: resultImage.error,
        message: "Có lỗi trong quá trình upload ảnh",
        success: false,
      });
    }

    req.body._id = id;
    req.body.idUser = dataUser.id;
    req.body.logo = resultImage.url;
    const newVCard = new vCardModel(req.body);
    await newVCard
      .save()
      .then((result) => {
        res.status(200).send({
          success: true,
          code: 0,
          message: "Tạo V-Card thành công !",
          data: result,
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
    const dataUser = decodeJWT(req, res);
    await vCardModel
      .find({
        idUser: dataUser.id,
      })
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

export const getById = async (req, res) => {
  try {
    if (req.params.id) {
      vCardModel
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

export const update = async (req, res) => {
  try {
    const file = req.file;
    const dataUser = decodeJWT(req, res);
    if (req.params.id) {
      if (req.body.email) {
        if (!validator.isEmail(req.body.email)) {
          return res.status(400).send({
            success: false,
            code: -1,
            message: "Email không hợp lệ !",
          });
        }
      }
      if (req.body.phone) {
        if (
          !validator.isMobilePhone(req.body.phone) ||
          req.body.phone.length <= 8
        ) {
          return res.status(400).send({
            success: false,
            code: -1,
            message: "Số điện thoại không hợp lệ !",
          });
        }
      }
      if (req.body.nameUser.match(/[-!@#$%^&*(),.?":{}|<>]/)) {
        return res.status(400).send({
          success: false,
          code: -1,
          message: "Tên người không hợp lệ !",
        });
      }
      vCardModel
        .findById({ _id: req.params.id })
        .then((result) => {
          req.body = JSON.parse(JSON.stringify(req.body));
          for (let field in req.body) {
            if (req.body.hasOwnProperty(field)) {
              result[field] = req.body[field];
            }
          }
          if (result.idUser === dataUser.id) {
            result
              .save()
              .then(async (r) => {
                if (file) {
                  const resultImage = await uploadS3(
                    "v-card",
                    req.params.id + "/" + "v-card.jpeg",
                    file
                  );
                  console.log(resultImage);
                  if (!resultImage.success) {
                    return res.status(500).json({
                      error: resultImage.error,
                      message: "Có lỗi trong quá trình upload ảnh",
                      success: false,
                    });
                  }
                }
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
          } else {
            return res.status(401).send({
              success: false,
              code: 0,
              message: "Sao sửa card của ngta z bạn",
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

export const updateQR = async (req, res) => {
  try {
    const dataUser = decodeJWT(req, res);
    if (!req.body.QRcode || !req.body.preview) {
      return res.status(400).send({
        success: false,
        code: -1,
        message: "Thiếu trường dữ liệu !",
      });
    }
    if (req.params.id) {
      vCardModel
        .findById({ _id: req.params.id })
        .then((result) => {
          for (let field in req.body) {
            if (req.body.hasOwnProperty(field)) {
              result[field] = req.body[field];
            }
          }
          if (result.idUser === dataUser.id) {
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
          } else {
            return res.status(401).send({
              success: false,
              code: 0,
              message: "Sao sửa card của ngta z bạn",
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

export const remove = async (req, res) => {
  try {
    const dataUser = decodeJWT(req, res);
    if (req.params.id) {
      vCardModel
        .findById({ _id: req.params.id })
        .then((result) => {
          if (result.idUser === dataUser.id) {
            result
              .deleteOne()
              .then(async (r) => {
                const resultImage = await deleteS3(
                  "v-card",
                  req.params.id + "/" + "v-card.jpeg"
                );
                if (resultImage.success) {
                  return res.status(200).send({
                    success: true,
                    code: 0,
                    message: "Xoá thành công",
                  });
                }
                return res.status(500).send({
                  success: false,
                  code: 0,
                  message: "Xoá thất bại",
                });
              })
              .catch((err) => {
                return res.status(500).send({
                  success: false,
                  code: -1,
                  message: err.message,
                });
              });
          } else {
            return res.status(401).send({
              success: false,
              code: 0,
              message: "Sao xoá card của ngta z ăn ở ko đi phá hã cd",
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
