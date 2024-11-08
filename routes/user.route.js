import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  loginUser,  
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
