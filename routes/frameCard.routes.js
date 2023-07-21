import express from "express";
import {
  post,
  get,
  findById,
  download,
  findByIdBase64,
} from "../controllers/frameCard.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), post);
router.post("/download/:id", download);
router.get("/", get);
router.get("/:id", findById);
router.get("/base64/:id", findByIdBase64);

export default router;
