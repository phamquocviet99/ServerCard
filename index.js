import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import frameCardRoutes from "./routes/frameCard.routes.js";
import userRoutes from "./routes/users.routes.js";
import vCardRoutes from "./routes/vCard.routes.js";
import multer from "multer";
import upload from "./middleware/multer.js";
import AWS3, { PutObjectAclCommand, S3Client } from "@aws-sdk/client-s3";
import { uploadS3 } from "./middleware/AWS_S3.js";
// import s3Client, { uploadS3 } from "./middleware/AWS_S3.js";

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
app.use("/frame-card", frameCardRoutes);
app.use("/auth", userRoutes);
app.use("/v-card", vCardRoutes);

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
console.log(file)
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    // const result = await uploadS3("v-card", "Viet", req.file);
    // console.log(result.url)
    return res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/v3/buckets", async (req, res) => {
  try {
    const command = new AWS3.ListBucketsCommand({});
    const resp = await s3Client.send(command);
    res.send(resp.Buckets);
  } catch (error) {
    console.log(error);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
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
