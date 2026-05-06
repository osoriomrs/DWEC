import db from "../db/db.js";

/* ===================== MENU PRIVADO ===================== */
const privateMenu = (user) => `
<nav style="background:#ddd;padding:10px">
  <a href="/">Inicio</a> |
  <a href="/portfolio/${user.username}">Mi portfolio</a> |
  <a href="/dashboard">Dashboard</a> |
  <a href="/logout">Logout</a>
  <span style="float:right">Logged in as ${user.username}</span>
</nav>
`;

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

  res.send(`
  ${privateMenu(user)}

  <h1>Dashboard</h1>

  <form method="POST" action="/dashboard/profile">
    <input name="bio" value="${user.bio || ''}" placeholder="bio">
    <input name="email" value="${user.email}" placeholder="email">
    <button>Actualizar perfil</button>
  </form>

  <h2>Proyectos</h2>

  ${projects.map(p => `
    <div>
      <b>${p.title}</b>
      <p>${p.description}</p>

      <a href="/dashboard/project/edit/${p.id}">Editar</a>
      <a href="/dashboard/project/delete/${p.id}">Borrar</a>
    </div>
  `).join("")}

  <form method="POST" action="/dashboard/project">
    <input name="title" placeholder="titulo">
    <input name="description" placeholder="descripcion">
    <button>Agregar proyecto</button>
  </form>

  <h2>Redes</h2>

  ${socials.map(s => `
    <div>
      <b>${s.platform}</b>
      <a href="${s.url}" target="_blank">link</a>

      <a href="/dashboard/social/edit/${s.id}">Editar</a>
      <a href="/dashboard/social/delete/${s.id}">Borrar</a>
    </div>
  `).join("")}

  <form method="POST" action="/dashboard/social">
    <input name="platform" placeholder="plataforma">
    <input name="url" placeholder="url">
    <button>Agregar red</button>
  </form>
  `);
};

/* ===================== PERFIL ===================== */
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