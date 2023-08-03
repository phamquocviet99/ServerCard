import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import vCardRoutes from "./routes/vCard.routes.js";
import usersJoinRoutes from "./routes/users.join.routes.js";
import multer from "multer";
import { checkSendEmail } from "./controllers/taskSendInvitation.controller.js";

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

app.get("/test", checkSendEmail);

// app.use("/images", express.static("uploads"));

const base64Image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/UlEQVRYheWXzRGEIAyFn8OBIyVQCqVJaZZiCR49OJvNDyrOrg2EHGTCx8WY9wzAa8xksQKTLLHlH39ksRdeE6coazw0jx5Jlq35qsEhyzYmSfzptTruiXz6YcmphR2gBf9U4oSc/pb2SVV/+9sw5I7YJ4/wQawGsmgf5D1Ib0hT+CRUs8hZft+Bk77jByAoRIduReo6nqvjjbC/yRay9gGHOvlghJ/BZhegVaciOSRX2OxCqnp6OLl70lRPOr/xHx3BDsAfWbQCs6keNruUxw3MDclkM7lNaXIJqXZ4TNJm8lq2EYj423CkaeGcye0G5pH0/sZEz/06n2vyGl+afuLpQXhsfAAAAABJRU5ErkJggg=="; // Đây là dữ liệu hình ảnh base64 thực tế

app.get("/image.png", (req, res) => {
  res.set("Content-Type", "image/png");
  res.send(`<img src="${base64Image}" alt="Base64 Image">`);
});

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
