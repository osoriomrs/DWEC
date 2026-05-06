import db from "../db/db.js";
import path from "path";

/* =========================
   DASHBOARD PRINCIPAL
========================= */
export const dashboard = async (req, res) => {
  // 🔒 PROTECCIÓN DE RUTA
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const userId = req.session.user.id;

  // PROYECTOS DEL USUARIO
  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id = ?",
    [userId]
  );

  // REDES SOCIALES DEL USUARIO
  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id = ?",
    [userId]
  );

  // guardamos datos para la vista
  req.session.dashboardData = {
    user: req.session.user,
    projects,
    socials
  };

  res.sendFile(path.resolve("views/dashboard/dashboard.html"));
};

/* =========================
   PROYECTOS
========================= */
export const addProject = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const { title, description, repo_url, live_url } = req.body;

  await db.query(
    `INSERT INTO projects (title, description, repo_url, live_url, user_id)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, repo_url, live_url, req.session.user.id]
  );

  res.redirect("/dashboard");
};

export const deleteProject = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  await db.query(
    "DELETE FROM projects WHERE id = ? AND user_id = ?",
    [req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};

/* =========================
   SOCIAL LINKS
========================= */
export const addSocial = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const { platform, url } = req.body;

  await db.query(
    `INSERT INTO social_links (platform, url, user_id)
     VALUES (?, ?, ?)`,
    [platform, url, req.session.user.id]
  );

  res.redirect("/dashboard");
};

export const deleteSocial = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  await db.query(
    "DELETE FROM social_links WHERE id = ? AND user_id = ?",
    [req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};