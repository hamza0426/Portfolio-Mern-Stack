import express from "express";
import { Authentication } from "../middlewares/authentication.js";
import { postTimeline } from "../controllers/timelineController.js";

const router = express.Router();

router.post("/add-timeline", postTimeline);

export default router;