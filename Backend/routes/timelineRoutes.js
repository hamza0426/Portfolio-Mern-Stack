import express from "express";
import { Authentication } from "../middlewares/authentication.js";
import { deleteTimeline, getAllTimelines, postTimeline } from "../controllers/timelineController.js";

const router = express.Router();

router.post("/add-timeline", Authentication, postTimeline);
router.delete("/delete-timeline/:id", Authentication, deleteTimeline);
router.get("/get-all-timelines", getAllTimelines);

export default router;