import qr from "qrcode";
import { update } from "./taskSendInvitation.controller.js";
import { createCanvas, loadImage, Image } from "canvas";
import usersJoinModel from "../models/users.join.model.js";
export const genQRcode = async (req, res) => {
  if (!req.params.id)
    return res.status(500).json({
      error: err,
      success: false,
      code: 500,
    });
  Promise.all([
    sendQRcode(req.params.id, res),
    update(req.params.id, {
      isReceivedEmail: true,
    }),
  ]).catch((err) => {
    return new Error(err);
  });
};

function sendQRcode(id, res) {
  if (!id) return;
  return new Promise(function (resolve, reject) {
    qr.toDataURL(id)
      .then((result) => {
        resolve(result);
        res.status(200);
        res.set("Content-Type", "image/jpeg");
        const data = new Buffer.from(
          result.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        res.send(data);
      })
      .catch((err) => {
        reject(err);
        res.status(500).send({ success: false });
      });
  });
}

export const getImageInvitation = async (req, res) => {
  if (!req.params.id)
    return res.status(500).json({
      error: err,
      success: false,
      code: 500,
    });
  const userData = await usersJoinModel.findById({ _id: req.params.id });
  Promise.all([
    genImageInvitation(userData, res),
    // update(req.params.id, {
    //   isReceivedEmail: true,
    // }),
  ]).catch((err) => {
    return new Error(err);
  });
};

export const genImageInvitation = async (data, res) => {
  try {
    const width = 1488; // Chiều rộng của ảnh nền
    const height = 1291; // Chiều cao của ảnh nền

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const backgroundImage = await loadImage("./template/template.png");
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    var base64 = null;
    await qr
      .toDataURL(data._id)
      .then((result) => (base64 = result))
      .catch((error) => {
        res.status(500).send({ success: false, error: error });
      });
    const smallImage = new Image();
    smallImage.src = base64;
    const smallImageWidth = 220; // Chiều rộng ảnh nhỏ
    const smallImageHeight = 220; // Chiều cao ảnh nhỏ
    const x = (width - smallImageWidth) / 4 - 35; // Vị trí x để căn giữa
    const y = (height - smallImageHeight) / 2 + 30; // Vị trí y để căn giữa
    ctx.fillStyle = "black";
    ctx.font = "italic 23px Arial";
    ctx.fillText(
      "Mã QR Check-in sự kiện",
      x,
      y - 10,
      smallImageWidth,
      smallImageHeight
    );
    ctx.drawImage(smallImage, x, y, smallImageWidth, smallImageHeight);

    const textBlocks = [
      {
        text: `Ông/Bà : ${data.fullName} `,
        font: "italic bold 28px Times New Roman",
        color: "#15803d",
      },
      {
        text: `${data.position}`,
        font: "italic 23px Times New Roman",
        color: "#15803d",
      },
    ];

    var yText = 275;
    // Vẽ nhiều đoạn văn bản với các font khác nhau
    textBlocks.forEach(({ text, font, color }) => {
      ctx.fillStyle = color;
      ctx.font = font;

      const textWidth = ctx.measureText(text).width;
      const xText = (788 - textWidth) / 2; // Vị trí x để căn giữa văn bản
      ctx.fillText(text, xText, yText);

      yText += 50; // Tăng vị trí y cho đoạn văn bản tiếp theo
    });
    // Gửi ảnh dưới dạng response
    const buffer = canvas.toBuffer();
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  } catch (error) {
    res.status(500).send({ success: false, error: error });
  }
};
