import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import vCardRoutes from "./routes/vCard.routes.js";
import usersJoinRoutes from "./routes/users.join.routes.js";
import multer from "multer";

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
