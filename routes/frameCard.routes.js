import express from "express";
import { post, get, findById } from "../controllers/frameCard.controller.js";

const router = express.Router();

router.post("/", post);
router.get("/", get);
router.get("/:id", findById);

export default router;
