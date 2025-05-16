import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minLemgth: [2, "Name must contain atleat 2 characters!!!"],
    },
    subject: {
        type: String,
        minLemgth: [2, "Subject must contain atleat 2 characters!!!"],
    },
    message: {
        type: String,
        minLemgth: [2, "Message must contain atleat 2 characters!!!"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const Message = mongoose.model("Message", messageSchema); 