import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avatar & Resume are Required!!!", 400));
    }

    const {avatar, resume} = req.files;
    const cloudinaryAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, {folder: "AVATARS"});
    if(!cloudinaryAvatar || cloudinaryAvatar.error) {
        console.error("Cloudinary error: ", cloudinaryAvatar.error || "Unknown Cloudinary Error");
    };
    const cloudinaryResume = await cloudinary.uploader.upload(resume.tempFilePath, {folder: "RESUME"});
    if(!cloudinaryResume || cloudinaryResume.error) {
        console.error("Cloudinary error: ", cloudinaryResume.error || "Unknown Cloudinary Error");
    };

    const {
        fullName,
        email,
        phone, 
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        linkedInURL,
    } = req.body;

    const user = await User.create({
        fullName,
        email,
        phone, 
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        linkedInURL,
        avatar: {
            public_id: cloudinaryAvatar.public_id,
            url: cloudinaryAvatar.secure_url,
        },
        resume: {
            public_id: cloudinaryResume.public_id,
            url: cloudinaryResume.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "User Successfully Registered!!!",
    });
})