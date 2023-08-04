import express from "express";
import {
  getAll,
  getById,
  register,
} from "../controllers/sponsor.controller.js";

const router = express.Router();
router.post("/", register);
router.get("/:id", getById);
router.get("/", getAll);

export default router;
