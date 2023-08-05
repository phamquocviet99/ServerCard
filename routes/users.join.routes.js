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
const router = express.Router();
router.post("/", register);
router.get("/download", download);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateById);

router.post("/checkin/:id", checkAuth, updateCheckin);

export default router;
