import express from "express";
import { Authentication } from "../middlewares/authentication.js";
import { addApplication, deleteApplication, getAllApplications } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/add-application", Authentication, addApplication);
router.delete("/delete-application/:id", Authentication, deleteApplication);
router.get("/get-all-applications", getAllApplications);

export default router;