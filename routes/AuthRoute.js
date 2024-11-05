import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	forgotPasswordUser,
} from "../controllers/AuthController.js";
import  verifyToken  from "../middleware/verifyToken.js";

const router = express.Router();
// route
router.get("/check-auth", verifyToken(['user','admin','superadmin']), checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/user", forgotPasswordUser);

router.post("/reset-password/:token", resetPassword);

export default router;