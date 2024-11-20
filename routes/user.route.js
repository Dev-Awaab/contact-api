import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { AuthMiddleWare } from "../middleware/auth.js";

const router = express.Router();

router.post("/reg", registerUser);
router.post("/login", loginUser);
router.get("/current", AuthMiddleWare, getUser);
router.put("/me", AuthMiddleWare, updateUser);

export default router;
