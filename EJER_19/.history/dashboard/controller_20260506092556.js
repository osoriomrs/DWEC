import db from "../db/db.js";

/* ===================== DASHBOARD ===================== */
export const dashboard = async (req, res) => {
  const userId = req.session.user.id;

  const [userRows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );

  const user = userRows[0];

  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id = ?",
    [userId]
  );

  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id = ?",
    [userId]
  );

  res.send(`<h1>Dashboard OK</h1>`);
};

/* ===================== PROFILE ===================== */
export const updateProfile = async (req, res) => {
  const { bio, email } = req.body;

  await db.query(
    "UPDATE users SET bio=?, email=? WHERE id=?",
    [bio, email, req.session.user.id]
  );

  res.redirect("/dashboard");
};

/* ===================== PROJECTS ===================== */
export const addProject = async (req, res) => {
  const { title, description } = req.body;

  await db.query(
    "INSERT INTO projects (title, description, user_id) VALUES (?, ?, ?)",
    [title, description, req.session.user.id]
  );

  res.redirect("/dashboard");
};

export const deleteProject = async (req, res) => {
  await db.query(
    "DELETE FROM projects WHERE id=? AND user_id=?",
    [req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};

export const editProjectForm = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM projects WHERE id=? AND user_id=?",
    [req.params.id, req.session.user.id]
  );

  if (rows.length === 0) return res.send("No permitido");

  const p = rows[0];

  res.send(`
    <form method="POST">
      <input name="title" value="${p.title}">
      <input name="description" value="${p.description}">
      <button>Guardar</button>
    </form>
  `);
};

export const editProject = async (req, res) => {
  const { title, description } = req.body;

  await db.query(
    "UPDATE projects SET title=?, description=? WHERE id=? AND user_id=?",
    [title, description, req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};

/* ===================== SOCIAL ===================== */
export const addSocial = async (req, res) => {
  const { platform, url } = req.body;

  await db.query(
    "INSERT INTO social_links (platform, url, user_id) VALUES (?, ?, ?)",
    [platform, url, req.session.user.id]
  );

  res.redirect("/dashboard");
};

export const deleteSocial = async (req, res) => {
  await db.query(
    "DELETE FROM social_links WHERE id=? AND user_id=?",
    [req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};

export const editSocialForm = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM social_links WHERE id=? AND user_id=?",
    [req.params.id, req.session.user.id]
  );

  if (rows.length === 0) return res.send("No permitido");

  const s = rows[0];

  res.send(`
    <form method="POST">
      <input name="platform" value="${s.platform}">
      <input name="url" value="${s.url}">
      <button>Guardar</button>
    </form>
  `);
};

export const editSocial = async (req, res) => {
  const { platform, url } = req.body;

  await db.query(
    "UPDATE social_links SET platform=?, url=? WHERE id=? AND user_id=?",
    [platform, url, req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};