import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { Applications } from "../models/applicationSchema.js";

export const addApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Appplication Image is required!!!", 400));
  }

  const { img } = req.files;
  const { name } = req.body || {};
  if (!name) {
    return next(new ErrorHandler("Application Name is Required!!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    img.tempFilePath,
    { folder: "Software Applications" },
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown Cloudinary Error",
    );
  }

  const applications = await Applications.create({
    name,
    img: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Application added Successfully!!!",
    applications,
  });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const application = await Applications.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application did not Exist!!!", 404));
  }

  const applicationId = application.img.public_id;
  await cloudinary.uploader.destroy(applicationId);
  await Applications.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software deleted Successfuly!!",
  });
});

// export const updateApplication

// export const updateProject = catchAsyncErrors(async (req, res, next) => {
//   const currentData = {
//     title: req.body?.title,
//     description: req.body?.description,
//     gitRepoLink: req.body?.gitRepoLink,
//     projectLink: req.body?.projectLink,
//     technologies: req.body?.technologies,
//     stack: req.body?.stack,
//     deployed: req.body?.deployed,
//   };

//   if (req.files && req.files.projectImage) {
//     const img = req.files.projectImage;
//     const project = await Projects.findById(req.params);
//     const imgId = project.projectImage.public_id;
//     await cloudinary.uploader.destroy(imgId);
//     const cloudinaryResponse = await cloudinary.uploader.upload(
//       img.tempFilePath,
//       { folder: "Project Images" },
//     );

//     currentData.projectImage = {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.url,
//     };
//   }

//   const project = await Projects.findByIdAndUpdate(req.params.id, currentData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Project Updated Successfully!!",
//     project,
//   });
// });

export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const applications = await Applications.find();
  res.status(200).json({
    success: true,
    applications,
  });
});
