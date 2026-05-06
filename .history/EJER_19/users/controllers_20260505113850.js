import db from "../db/db.js";
import { md5 } from "../utils/md5.js";

// REGISTER
export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  const hash = md5(password);

  await db.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, hash, email]
  );

  res.redirect("/login");
};

// LOGIN
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const hash = md5(password);

  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, hash]
  );

  if (rows.length === 0) {
    return res.send("Login incorrecto");
  }

  req.session.user = rows[0];

  res.redirect("/dashboard");
};

// LOGOUT
export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};