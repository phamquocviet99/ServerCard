import express from "express";
import {
  post,
  get,
  getById,
  update,
  remove,
} from "../controllers/vCard.controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/", checkAuth, post);
router.get("/", checkAuth, get);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
