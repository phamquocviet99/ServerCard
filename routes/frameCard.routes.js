import express from "express";
import {
  post,
  get,
  findById,
  download,
} from "../controllers/frameCard.controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/", post);
router.post("/download/:id", download);
router.get("/", get);
router.get("/:id", findById);

export default router;
