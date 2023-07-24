import express from "express";
import {
  register,
  remove,
  getAll,
  changePassword,
  login,
} from "../controllers/users.controller.js";
// import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getAll);
router.delete("/:id", remove);
router.put("/change", changePassword);

export default router;
