import express from "express";
import {
  post,
  get,
  findById,
  download,
  remove,
} from "../controllers/frameCard.controller.js";
import upload from "../middleware/multer.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/", upload.single("image"), post);
router.delete("/:id", checkAuth, remove);
router.post("/download/:id", download);
router.get("/", get);
router.get("/:id", findById);

export default router;
