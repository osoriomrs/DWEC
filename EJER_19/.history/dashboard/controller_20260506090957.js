import db from "../db/db.js";

/* ===================== DASHBOARD ===================== */
export const dashboard = async (req, res) => {
  const userId = req.session.user.id;

  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id = ?",
    [userId]
  );

  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id = ?",
    [userId]
  );

  res.send("<h1>Dashboard funcionando</h1>");
};

/* ===================== PROJECTS ===================== */
export const addProject = async (req, res) => {
  res.send("addProject OK");
};

export const deleteProject = async (req, res) => {
  res.send("deleteProject OK");
};

/* ===================== SOCIAL ===================== */
export const addSocial = async (req, res) => {
  res.send("addSocial OK");
};

export const deleteSocial = async (req, res) => {
  res.send("deleteSocial OK");
};