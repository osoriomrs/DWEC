import db from "../db/db.js";
import { md5 } from "../utils/md5.js";
import path from "path";

// LOGIN FORM
export const loginForm = (req, res) => {
  res.sendFile(path.resolve("views/users/login.html"));
};

// REGISTER FORM
export const registerForm = (req, res) => {
  res.sendFile(path.resolve("views/users/register.html"));
};

// REGISTER
export const register = async (req, res) => {
  const { username, password, email } = req.body;

  await db.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, md5(password), email]
  );

  res.redirect("/login");
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, md5(password)]
  );

  if (rows.length === 0) {
    return res.send("Login incorrecto");
  }

  req.session.user = rows[0];

  res.redirect(`/portfolio/${username}`);
};

// LOGOUT
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};