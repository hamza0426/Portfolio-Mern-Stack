import { sendMessage, getAllMessages, deleteMessage } from "../controllers/messageController.js";
import express from "express";

const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/get-all-messages", getAllMessages);
router.put("/delete-message", deleteMessage);

export default router;