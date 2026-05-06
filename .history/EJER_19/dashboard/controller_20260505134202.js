import db from "../db/db.js";

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

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container mt-4">

  <h1>Dashboard</h1>

  <a href="/logout" class="btn btn-danger mb-3">Logout</a>

  <div class="row">

    <div class="col-md-6">

      <div class="card p-3 mb-3">
        <h3>Proyectos</h3>

        ${projects.map(p => `
          <div class="border p-2 mb-2">
            <strong>${p.title}</strong>
            <p>${p.description}</p>

            <a class="btn btn-sm btn-danger"
               href="/dashboard/project/delete/${p.id}">
              Borrar
            </a>
          </div>
        `).join("")}

        <form method="POST" action="/dashboard/project">
          <input name="title" class="form-control mb-2" placeholder="Título">
          <input name="description" class="form-control mb-2" placeholder="Descripción">
          <button class="btn btn-success w-100">Agregar proyecto</button>
        </form>

      </div>

    </div>

    <div class="col-md-6">

      <div class="card p-3 mb-3">
        <h3>Redes sociales</h3>

        ${socials.map(s => `
          <div class="border p-2 mb-2">
            <strong>${s.platform}</strong>

            <a class="btn btn-sm btn-danger"
               href="/dashboard/social/delete/${s.id}">
              Borrar
            </a>
          </div>
        `).join("")}

        <form method="POST" action="/dashboard/social">
          <input name="platform" class="form-control mb-2" placeholder="Plataforma">
          <input name="url" class="form-control mb-2" placeholder="URL">
          <button class="btn btn-primary w-100">Agregar red</button>
        </form>

      </div>

    </div>

  </div>

</div>

</body>
</html>
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
    "DELETE FROM projects WHERE id = ? AND user_id = ?",
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
    "DELETE FROM social_links WHERE id = ? AND user_id = ?",
    [req.params.id, req.session.user.id]
  );

  res.redirect("/dashboard");
};