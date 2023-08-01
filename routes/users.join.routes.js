import express from "express";
import {
  register,
  download,
  getAll,
  updateCheckin,
  getById,
} from "../controllers/users.join.controller.js";
import checkAuth from "../middleware/check-auth.js";
const router = express.Router();
router.post("/", register);
router.get("/download", download);
router.get("/", getAll);
router.get("/:id", getById);
router.post("/checkin/:id", checkAuth, updateCheckin);

export default router;
