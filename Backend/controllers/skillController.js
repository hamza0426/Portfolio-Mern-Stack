import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { Skills } from "../models/skillsSchema.js"; 

export const addSkill = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Skill Image icon is required!!!", 400));
    }

    const { img } = req.files;
    const { title, proficiency } = req.body || {};

    if(!title || !proficiency) {
        return next(new ErrorHandler("Please fill full form!!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        img.tempFilePath, { folder: "Skills" }
    );
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown Cloudinary Error!!");
    }

    const skill = await Skills.create({
        title, 
        proficiency,
        img: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Skill Added Successfully!!",
        skill,
    });
});

export const deleteSkill = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    const skill = await Skills.findById(id);
    if(!skill) {
        return next(new ErrorHandler("Skill did not exist!!!", 404));
    }

    const skillId = skill.img.public_id;
    await cloudinary.uploader.destroy(skillId);
    await skill.deleteOne();
    
    res.status(200).json({
        success: true,
        message: "Skill deleted Successfully!!!",
    });
});

export const updateSkill = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    let skill = await Skills.findById(id);
    if(!skill) {
        return next(new ErrorHandler("Skill did not exist!!!", 404));
    }

    const { proficiency } = req.body;
    skill = await Skills.findByIdAndUpdate(id, { proficiency }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Skill updated Successfully!!",
        skill,
    });
});

export const getAllSkills = catchAsyncErrors(async(req, res, next) => {
    const skills = await Skills.find();
    res.status(200).json({
        success: true,
        skills,
    });
});