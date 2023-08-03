import express from "express";
import { genQRcode } from "../controllers/genQRcode.controller.js";
const router = express.Router();
router.get("/:id/QRcode.png", genQRcode);
export default router;
