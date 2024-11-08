import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { AuthMiddleWare } from "../middleware/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/current", AuthMiddleWare, getUser);

export default router;
