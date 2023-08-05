import express from "express";
import {
  register,
  download,
  getAll,
  updateCheckin,
  getById,
  updateById,
} from "../controllers/users.join.controller.js";
import checkAuth from "../middleware/check-auth.js";
import upload from "../middleware/multer.js";
const router = express.Router();
router.post("/", upload.single("urlAvatar"), register);
router.get("/download", download);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", upload.single("urlAvatar"), updateById);

router.post("/checkin/:id", checkAuth, updateCheckin);

export default router;
