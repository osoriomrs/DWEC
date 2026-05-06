import db from "../db/db.js";

export const dashboard = async (req, res) => {
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
      <p>${p.title}
      <a href="/dashboard/project/delete/${p.id}">Borrar</a></p>
    `).join("")}

    <form method="POST" action="/dashboard/project">
      <input name="title" placeholder="titulo"/>
      <input name="description" placeholder="desc"/>
      <button>Agregar</button>
    </form>

    <h2>Redes</h2>
    ${socials.map(s => `
      <p>${s.platform}
      <a href="/dashboard/social/delete/${s.id}">Borrar</a></p>
    `).join("")}

    <form method="POST" action="/dashboard/social">
      <input name="platform" placeholder="plataforma"/>
      <input name="url" placeholder="url"/>
      <button>Agregar</button>
    </form>
  `);
};

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