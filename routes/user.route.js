<<<<<<< HEAD
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
=======
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
>>>>>>> 142b8ff543982367019ba5fc1cc3f6e932b4f724
