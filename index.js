import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import frameCardRoutes from "./routes/frameCard.routes.js";
import userRoutes from "./routes/users.routes.js";
import vCardRoutes from "./routes/vCard.routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const URI = process.env.MONGODB_URL;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // limit from front-end data 30MB
// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/frame-card", frameCardRoutes);
app.use("/auth", userRoutes);
app.use("/v-card", vCardRoutes);
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
