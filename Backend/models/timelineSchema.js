import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is Required!!"],
    },
    description: {
        type: String,
        required: [true, "Description is Required!!"],
    },
    timeline: {
        from: {
            type: String,
            required: [true, "Timeline Starting date is required!!"]
        }, 
        to: {
            type: String,
            required: [true, "Timeline ending date is required!!"]
        },
    },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);