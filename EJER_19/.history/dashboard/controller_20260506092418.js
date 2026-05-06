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
  <span class="navbar-brand">Portfolio Dashboard</span>
  <span class="text-white">Logged as <b>${user.username}</b></span>
</nav>

<div class="container mt-4">

  <!-- PERFIL -->
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <h4>Perfil</h4>

      <form method="POST" action="/dashboard/profile" class="row g-2">
        <div class="col-md-6">
          <input class="form-control" name="bio" value="${user.bio || ""}" placeholder="Bio">
        </div>

        <div class="col-md-6">
          <input class="form-control" name="email" value="${user.email}" placeholder="Email">
        </div>

        <div class="col-12">
          <button class="btn btn-primary">Actualizar perfil</button>
        </div>
      </form>
    </div>
  </div>

  <div class="row">

    <!-- PROYECTOS -->
    <div class="col-md-6">

      <div class="card shadow-sm">
        <div class="card-body">
          <h4>Proyectos</h4>

          ${projects.map(p => `
            <div class="border rounded p-2 mb-2 bg-white">
              <b>${p.title}</b>
              <p class="mb-1">${p.description}</p>

              <a class="btn btn-sm btn-warning"
                 href="/dashboard/project/edit/${p.id}">
                Editar
              </a>

              <a class="btn btn-sm btn-danger"
                 href="/dashboard/project/delete/${p.id}">
                Borrar
              </a>
            </div>
          `).join("")}

          <form method="POST" action="/dashboard/project" class="mt-3">
            <input class="form-control mb-2" name="title" placeholder="Título">
            <input class="form-control mb-2" name="description" placeholder="Descripción">
            <button class="btn btn-success w-100">Agregar proyecto</button>
          </form>

        </div>
      </div>

    </div>

    <!-- REDES -->
    <div class="col-md-6">

      <div class="card shadow-sm">
        <div class="card-body">
          <h4>Redes sociales</h4>

          ${socials.map(s => `
            <div class="border rounded p-2 mb-2 bg-white">
              <b>${s.platform}</b>
              <a href="${s.url}" target="_blank">ver</a>

              <br>

              <a class="btn btn-sm btn-warning"
                 href="/dashboard/social/edit/${s.id}">
                Editar
              </a>

              <a class="btn btn-sm btn-danger"
                 href="/dashboard/social/delete/${s.id}">
                Borrar
              </a>
            </div>
          `).join("")}

          <form method="POST" action="/dashboard/social" class="mt-3">
            <input class="form-control mb-2" name="platform" placeholder="Plataforma">
            <input class="form-control mb-2" name="url" placeholder="URL">
            <button class="btn btn-primary w-100">Agregar red</button>
          </form>

        </div>
      </div>

    </div>

  </div>

</div>

</body>
</html>
  `);
};