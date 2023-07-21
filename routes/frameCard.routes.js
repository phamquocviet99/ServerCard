import express from "express";
import {
  post,
  get,
  findById,
  download,
} from "../controllers/frameCard.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), post);
router.post("/download/:id", download);
router.get("/", get);
router.get("/:id", findById);

export default router;
