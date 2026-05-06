import db from "../db/db.js";
import { md5 } from "../utils/md5.js";

export const loginForm = (req, res) => {
  res.sendFile(path.resolve("views/users/login.html"));
};

export const registerForm = (req, res) => {
  res.sendFile(process.cwd() + "/users/register.html");
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  await db.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, md5(password), email]
  );

  res.redirect("/login");
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const [user] = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, md5(password)]
  );

  if (user.length === 0) return res.send("Login incorrecto");

  req.session.user = user[0];
  res.redirect(`/portfolio/${username}`);
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};