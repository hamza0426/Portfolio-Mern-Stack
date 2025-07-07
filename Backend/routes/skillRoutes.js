import express from "express";
import { Authentication } from "../middlewares/authentication.js";
import { addSkill, deleteSkill, getAllSkills, updateSkill } from "../controllers/skillController.js";

const router = express.Router();

router.post("/add-skill", Authentication, addSkill);
router.delete("/delete-skill/:id", Authentication, deleteSkill);
router.put("/update-skill/:id", Authentication, updateSkill);
router.get("/get-all-skills", getAllSkills);

export default router;