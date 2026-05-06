import db from "../db/db.js";

export const dashboard = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const userId = req.session.user.id;

  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id=?",
    [userId]
  );

  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id=?",
    [userId]
  );

  res.send(`
    <h1>Dashboard</h1>

    <h2>Proyectos</h2>
    ${projects.map(p => `
      <p>
        ${p.title}
        <a href="/dashboard/project/delete/${p.id}">Borrar</a>
      </p>
    `).join("")}

    <form method="POST" action="/dashboard/project">
      <input name="title" placeholder="titulo">
      <input name="description" placeholder="descripcion">
      <input name="repo_url" placeholder="repo">
      <input name="live_url" placeholder="live">
      <button>Agregar</button>
    </form>

    <h2>Redes</h2>
    ${socials.map(s => `
      <p>
        ${s.platform}
        <a href="/dashboard/social/delete/${s.id}">Borrar</a>
      </p>
    `).join("")}

    <form method="POST" action="/dashboard/social">
      <input name="platform">
      <input name="url">
      <button>Agregar</button>
    </form>
  `);
};

export const addProject = async (req, res) => {
  const { title, description, repo_url, live_url } = req.body;

  await db.query(
    "INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, repo_url, live_url, req.session.user.id]
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