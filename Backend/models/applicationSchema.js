import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name: String,
    img: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String, 
            required: true
        }
    }
});

export const Applications =  mongoose.model("Applications", applicationSchema)