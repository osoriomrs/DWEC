import db from "../db/db.js";

const privateMenu = (user) => `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<nav class="navbar navbar-dark bg-dark px-3">
  <a class="navbar-brand text-white" href="/">Inicio</a>

  <div>
    <a class="btn btn-outline-light me-2" href="/portfolio/${user.username}">Mi portfolio</a>
    <a class="btn btn-outline-light me-2" href="/dashboard">Dashboard</a>
    <a class="btn btn-danger" href="/logout">Logout</a>
  </div>

  <span class="text-white">Logged as ${user.username}</span>
</nav>
`;

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

    <div class="container mt-4">

      <h1>Dashboard</h1>

      <form method="POST" action="/dashboard/profile" class="mb-4">
        <input class="form-control mb-2" name="bio" value="${user.bio || ''}" placeholder="bio">
        <input class="form-control mb-2" name="email" value="${user.email}" placeholder="email">
        <button class="btn btn-primary">Actualizar perfil</button>
      </form>

      <h3>Proyectos</h3>

      ${projects.map(p => `
        <div class="card p-2 mb-2">
          <b>${p.title}</b>
          <p>${p.description}</p>

          <a class="btn btn-warning btn-sm" href="/dashboard/project/edit/${p.id}">Editar</a>
          <a class="btn btn-danger btn-sm" href="/dashboard/project/delete/${p.id}">Borrar</a>
        </div>
      `).join("")}

      <form method="POST" action="/dashboard/project">
        <input class="form-control mb-2" name="title" placeholder="titulo">
        <input class="form-control mb-2" name="description" placeholder="descripcion">
        <button class="btn btn-success">Agregar proyecto</button>
      </form>

      <h3 class="mt-4">Redes</h3>

      ${socials.map(s => `
        <div class="card p-2 mb-2">
          ${s.platform}

          <a class="btn btn-warning btn-sm" href="/dashboard/social/edit/${s.id}">Editar</a>
          <a class="btn btn-danger btn-sm" href="/dashboard/social/delete/${s.id}">Borrar</a>
        </div>
      `).join("")}

      <form method="POST" action="/dashboard/social">
        <input class="form-control mb-2" name="platform" placeholder="plataforma">
        <input class="form-control mb-2" name="url" placeholder="url">
        <button class="btn btn-primary">Agregar red</button>
      </form>

    </div>
  `);
};