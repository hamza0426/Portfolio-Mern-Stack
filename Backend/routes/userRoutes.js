import express from "express";
import { getUser, login, logout, register, updateProfile } from "../controllers/userController.js";
import { Authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user", Authentication, getUser);
router.get("/logout", Authentication, logout);
router.put("/update-profile", Authentication, updateProfile);

export default router;