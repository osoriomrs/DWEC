import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser
} from "./controller.js";

const router = express.Router();

// VISTAS SIMPLES
router.get("/register", (req, res) => {
  res.send(`
    <h2>Registro</h2>
    <form method="POST" action="/register">
      <input name="username" placeholder="usuario" />
      <input name="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <button>Registrar</button>
    </form>
  `);
});

router.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input name="username" />
      <input name="password" type="password" />
      <button>Entrar</button>
    </form>
  `);
});

// ACCIONES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;