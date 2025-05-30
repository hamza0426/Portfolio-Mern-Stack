import express from "express";
import { forgotPassword, getUser, getUserWithoutAuthentication, login, logout, register, resetPassword, updatePassword, updateProfile } from "../controllers/userController.js";
import { Authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user", Authentication, getUser);
router.get("/logout", Authentication, logout);
router.put("/update-profile", Authentication, updateProfile);
router.put("/update-password", Authentication, updatePassword);
router.get("/get-user-portfolio", getUserWithoutAuthentication);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;