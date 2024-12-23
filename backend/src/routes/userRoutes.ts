import express from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", isAuthenticated, getCurrentUser);

export default router;