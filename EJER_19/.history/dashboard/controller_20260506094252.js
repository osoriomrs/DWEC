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

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<nav class="navbar navbar-dark bg-dark px-3">
  <div class="d-flex align-items-center gap-3">
    <a href="/" class="btn btn-outline-light btn-sm">Inicio</a>
    <a href="/portfolio/${user.username}" class="btn btn-outline-light btn-sm">Ver portfolios</a>
    <a href="/dashboard" class="btn btn-outline-light btn-sm">Dashboard</a>
  </div>

  <div class="d-flex align-items-center gap-2">
    <span class="text-white">
      Logged in as <b>${user.username}</b>
    </span>

    <a href="/logout" class="btn btn-danger btn-sm">Logout</a>
  </div>
</nav>

<div class="container mt-4">

  <div class="card p-3 mb-4">
    <h4>Perfil</h4>

    <form method="POST" action="/dashboard/profile">
      <input class="form-control mb-2" name="bio" value="${user.bio || ""}" placeholder="bio">
      <input class="form-control mb-2" name="email" value="${user.email}" placeholder="email">
      <button class="btn btn-primary">Actualizar perfil</button>
    </form>
  </div>

  <div class="row">

    <div class="col-md-6">

      <div class="card p-3 mb-3">
        <h4>Proyectos</h4>

        ${projects.map(p => `
          <div class="border rounded p-2 mb-2 bg-white">
            <b>${p.title}</b>
            <p class="mb-1">${p.description}</p>

            <a class="btn btn-warning btn-sm"
               href="/dashboard/project/edit/${p.id}">Editar</a>

            <a class="btn btn-danger btn-sm"
               href="/dashboard/project/delete/${p.id}">Borrar</a>
          </div>
        `).join("")}

        <form method="POST" action="/dashboard/project">
          <input class="form-control mb-2" name="title" placeholder="titulo">
          <input class="form-control mb-2" name="description" placeholder="descripcion">
          <button class="btn btn-success w-100">Agregar proyecto</button>
        </form>
      </div>

    </div>

    <div class="col-md-6">

      <div class="card p-3 mb-3">
        <h4>Redes sociales</h4>

        ${socials.map(s => `
          <div class="border rounded p-2 mb-2 bg-white">
            <b>${s.platform}</b>

            <a class="btn btn-warning btn-sm"
               href="/dashboard/social/edit/${s.id}">Editar</a>

            <a class="btn btn-danger btn-sm"
               href="/dashboard/social/delete/${s.id}">Borrar</a>
          </div>
        `).join("")}

        <form method="POST" action="/dashboard/social">
          <input class="form-control mb-2" name="platform" placeholder="plataforma">
          <input class="form-control mb-2" name="url" placeholder="url">
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
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
<div class="container mt-5">

  <div class="card p-4">
    <h3>Editar proyecto</h3>

    <form method="POST">
      <input class="form-control mb-2" name="title" value="${p.title}">
      <input class="form-control mb-2" name="description" value="${p.description}">
      <button class="btn btn-success">Guardar</button>
    </form>

  </div>

</div>
</body>
</html>
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
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
<div class="container mt-5">

  <div class="card p-4">
    <h3>Editar red social</h3>

    <form method="POST">
      <input class="form-control mb-2" name="platform" value="${s.platform}">
      <input class="form-control mb-2" name="url" value="${s.url}">
      <button class="btn btn-success">Guardar</button>
    </form>

  </div>

</div>
</body>
</html>
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