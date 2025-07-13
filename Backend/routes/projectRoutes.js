import express from "express";
import { Authentication } from "../middlewares/authentication.js";
import { addProject, deleteProject, getAllProjects, getOneProject, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/add-project", Authentication, addProject);
router.delete("/delete-project/:id", Authentication, deleteProject);
router.put("/update-project/:id", Authentication, updateProject);
router.get("/get-all-projects", getAllProjects);
router.get("/get-one-project/:id", getOneProject);

export default router;