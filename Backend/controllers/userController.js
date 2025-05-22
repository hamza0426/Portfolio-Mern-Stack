import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

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
    generateToken(user, "User Registered Successfully!!!", 201, res);
});

export const login = catchAsyncErrors(async(req, res, next) => {
    const { email, password} = req.body || {};
    if(!email || !password) {
        return next(new ErrorHandler("Email and Password are required!!!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password!!!"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password!!!"));
    }
    generateToken(user, "Successfully Logged In!!!", 200, res);
});

export const getUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

export const logout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged Out Successfully!!!",
    });
});

export const updateProfile = catchAsyncErrors(async(req, res, next) => {
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body,phone, 
        aboutMe: req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        instagramURL: req.body.instagramURL,
        linkedInURL: req.body.linkedInURL,
    };

    if(req.files && req.files.avatar) {
        const avatar = req.files.avatar;
        const user = await User.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {folder: "AVATARS"});
        userData.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    if(req.files && req.files.resume) {
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);
        const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {folder: "RESUME"});
        userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully!!!",
        user,
    });
})