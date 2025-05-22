import { sendMessage, getAllMessages, deleteMessage } from "../controllers/messageController.js";
import express from "express";
import { Authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/get-all-messages", getAllMessages);
router.delete("/delete-message/:id", Authentication, deleteMessage);

export default router;