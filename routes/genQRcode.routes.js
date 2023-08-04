import express from "express";
import {
  genQRcode,
  getImageInvitation,
} from "../controllers/genQRcode.controller.js";
const router = express.Router();
router.get("/:id/QRcode.png", genQRcode);
router.get("/:id/invitation.png", getImageInvitation);

export default router;
