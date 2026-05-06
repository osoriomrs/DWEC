import express from "express";
import {
  loginForm,
  registerForm,
  register,
  login,
  logout
} from "./controller.js";

const router = express.Router();

router.get("/login", loginForm);
router.get("/register", registerForm);

router.post("/login", login);
router.post("/register", register);

router.get("/logout", logout);

export default router;