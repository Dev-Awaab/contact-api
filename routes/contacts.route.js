import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contact.controller.js";
import { AuthMiddleWare } from "../middleware/auth.js";
const router = express.Router();

router.use(AuthMiddleWare);
router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
