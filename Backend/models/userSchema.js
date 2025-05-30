import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is Required!!!"],
    },
    email: {
        type: String,
        required: [true, "Email is Required!!!"],
    },
    phone: {
        type: String,
        required: [true, "Phone Number is Required!!!"],
    },
    aboutMe: {
        type: String,
        required: [true, "About Me Field is Required!!!"],
    },
    password: {
        type: String,
        required: [true, "Password is Required!!!"],
        minLength: [7, "Minimum Length of Password should be atleast 7 characters!!"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    portfolioURL: {
        type: String,
        required: [true, "Portfolio URL is Required!!"],
    },
    githubURL: String,
    instagramURL: String,
    linkedInURL: String,
    facebookURL: String,
    twitterURL: String,

    resetPasswordCode: String,
    resetPasswordExpire: Date,
});

//for hasing password for security
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//for comparing password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//for generating json web token
userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

userSchema.methods.getResetCode = function() {
    const resetCode = crypto.randomBytes(20).toString("hex");

    this.resetPasswordCode = crypto.createHash("sha256").update(resetCode).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetCode;
}

export const User = mongoose.model("User", userSchema);
