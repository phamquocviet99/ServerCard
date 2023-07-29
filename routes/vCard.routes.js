import express from "express";
import {
  post,
  get,
  getById,
  update,
  remove,
  postAdmin
} from "../controllers/vCard.controller.js";
import checkAuth from "../middleware/check-auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", checkAuth, upload.single("logo"), post);
router.post("/join", upload.single("logo"), postAdmin);
router.get("/", checkAuth, get);
router.get("/:id", getById);
router.put("/:id", checkAuth, upload.single("logo"), update);
router.delete("/:id", checkAuth, remove);

export default router;
