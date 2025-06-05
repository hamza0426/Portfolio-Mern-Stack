import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeline = catchAsyncErrors(async(req, res, next) => {
    const {title, description, from, to} = req.body || {};
    const timelineNew = await Timeline.create({title, description, timeline: {from, to},});
    res.status(200).json({
        success: true,
        message: "Timeline Added Successfully!!",
        timelineNew,
    })
});

export const deleteTimeline = catchAsyncErrors(async(req, res, next) => {

});

export const getAllTimelines = catchAsyncErrors(async(req, res, next) => {

});