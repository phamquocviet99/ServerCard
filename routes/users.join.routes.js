import express from "express";
import {
  register,
  download,
  getAll,
} from "../controllers/users.join.controller.js";
const router = express.Router();
router.post("/", register);
router.get("/download", download);
router.get("/", getAll);

export default router;
