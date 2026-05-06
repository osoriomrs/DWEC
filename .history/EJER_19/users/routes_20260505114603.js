import express from "express";
import { loginForm, login, registerForm, register, logout } from "./controller.js";

const router = express.Router();

router.get("/login", loginForm);
router.post("/login", login);

router.get("/register", registerForm);
router.post("/register", register);

router.get("/logout", logout);

export default router;