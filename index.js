import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import vCardRoutes from "./routes/vCard.routes.js";
import usersJoinRoutes from "./routes/users.join.routes.js";
import genQRcodeRoutes from "./routes/genQRcode.routes.js";
import multer from "multer";
import schedule from "node-schedule";
import { checkSendEmail } from "./controllers/taskSendInvitation.controller.js";
import { createCanvas, loadImage, Image } from "canvas";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const URI = process.env.MONGODB_URL;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // limit from front-end data 30MB
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", userRoutes);
app.use("/v-card", vCardRoutes);
app.use("/event", usersJoinRoutes);
app.use("/images", genQRcodeRoutes);
app.get("/test", checkSendEmail);

// schedule.scheduleJob("*/60 * * * *", function () {
//   checkSendEmail();
// });



// app.get("/generate-image", async (req, res) => {
//   const width = 1488; // Chiều rộng của ảnh nền
//   const height = 1291; // Chiều cao của ảnh nền

//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");

//   const backgroundImage = await loadImage("./template/template.png");
//   ctx.drawImage(backgroundImage, 0, 0, width, height);

//   const base64 =
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/UlEQVRYheWXzRGEIAyFn8OBIyVQCqVJaZZiCR49OJvNDyrOrg2EHGTCx8WY9wzAa8xksQKTLLHlH39ksRdeE6coazw0jx5Jlq35qsEhyzYmSfzptTruiXz6YcmphR2gBf9U4oSc/pb2SVV/+9sw5I7YJ4/wQawGsmgf5D1Ib0hT+CRUs8hZft+Bk77jByAoRIduReo6nqvjjbC/yRay9gGHOvlghJ/BZhegVaciOSRX2OxCqnp6OLl70lRPOr/xHx3BDsAfWbQCs6keNruUxw3MDclkM7lNaXIJqXZ4TNJm8lq2EYj423CkaeGcye0G5pH0/sZEz/06n2vyGl+afuLpQXhsfAAAAABJRU5ErkJggg==";
//   const smallImage = new Image();
//   smallImage.src = base64;

//   const smallImageWidth = 180; // Chiều rộng ảnh nhỏ
//   const smallImageHeight = 180; // Chiều cao ảnh nhỏ
//   const x = (width - smallImageWidth) / 4 - 35; // Vị trí x để căn giữa
//   const y = (height - smallImageHeight) / 2 + 30; // Vị trí y để căn giữa

//   ctx.fillStyle = "black";
//   ctx.font = "italic 23px Arial";
//   ctx.fillText(
//     "Mã QR Check-in :",
//     x,
//     y - 25,
//     smallImageWidth,
//     smallImageHeight
//   );
//   ctx.drawImage(smallImage, x, y, smallImageWidth, smallImageHeight);

//   const textBlocks = [
//     {
//       text: "Ông/Bà : Phạm Quốc Việt ",
//       font: "italic bold 28px Times New Roman",
//       color: "#15803d",
//     },
//     {
//       text: "Chức vụ : Giám đốc công ty một mình tao",
//       font: "italic 23px Times New Roman",
//       color: "#15803d",
//     },
//   ];

//   var yText = 275;
//   // Vẽ nhiều đoạn văn bản với các font khác nhau
//   textBlocks.forEach(({ text, font, color }) => {
//     ctx.fillStyle = "black";
//     ctx.font = font;

//     const textWidth = ctx.measureText(text).width;
//     const xText = (788 - textWidth) / 2; // Vị trí x để căn giữa văn bản
//     ctx.fillText(text, xText, yText);

//     yText += 50; // Tăng vị trí y cho đoạn văn bản tiếp theo
//   });
//   // Gửi ảnh dưới dạng response
//   const buffer = canvas.toBuffer();
//   res.writeHead(200, {
//     "Content-Type": "image/png",
//     "Content-Length": buffer.length,
//   });
//   res.end(buffer);
// });

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.log("err", err);
  })
  .then(() => {
    console.log("Connected to Mongoose");
  });
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
