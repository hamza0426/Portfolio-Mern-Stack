import express from "express";
import { Authentication } from "../middlewares/authentication.js";
import { addProject, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/add-project", Authentication, addProject);
router.put("/update-project/:id", Authentication, updateProject);

export default router;