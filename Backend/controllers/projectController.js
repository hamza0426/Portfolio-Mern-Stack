import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { Projects } from "../models/projectSchema.js";

export const addProject = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project Image is required!!", 400));
    }

    const { projectImage } = req.files || {};
    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body || {};
    if(!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed) {
        return next(new ErrorHandler("Please fill full form!!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(projectImage.tempFilePath, { folder: "Project Images" });
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown Cloudinary Error!!");
        return next(new ErrorHandler("Unable to upload Project Image to cloudinary!!", 500));
    }

    const project = await Projects.create({ title, description, gitRepoLink, projectLink, technologies, stack, deployed,
        projectImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
        },
     });

     res.status(201).json({
        success: true,
        message: "Project Added Successfully!!",
        project,
     });
});

export const deleteProject = catchAsyncErrors(async(req, res, next) => {

});

export const updateProject = catchAsyncErrors(async(req, res, next) => {
    // const { id } = req.params;
    // let project = await Projects.findById(id);
    // if(!project) {
    //     return next(new ErrorHandler("Project did not exist!!!", 404));
    // }

    const currentData = {
        title: req.body?.title,
        description: req.body?.description,
        gitRepoLink: req.body?.gitRepoLink,
        projectLink: req.body?.projectLink,
        technologies: req.body?.technologies,
        stack: req.body?.stack,
        deployed: req.body?.deployed,
    };

    if(req.files && req.files.projectImage) {
        const img = req.files.projectImage;
        const project = await Projects.findById(req.params);
        const imgId = project.projectImage.public_id;
        await cloudinary.uploader.destroy(imgId);
        const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath, { folder: "Project Images" });

        currentData.projectImage = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
        }
    }

    const project = await Projects.findByIdAndUpdate(req.params.id, currentData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Project Updated Successfully!!",
        project,
    }); 
});