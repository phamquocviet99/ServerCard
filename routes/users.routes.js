import express from "express";
import {
  register,
  remove,
  getAll,
  changePassword,
} from "../controllers/users.controller.js";
// import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/login", register);
router.post("/logout", register);
router.get("/", getAll);
router.delete("/:id", remove);
router.put("/change", changePassword);

export default router;
