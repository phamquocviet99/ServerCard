import express from "express";
import { register,download } from "../controllers/users.join.controller.js";
const router = express.Router();
router.post("/", register);
router.get("/", download);

export default router;
