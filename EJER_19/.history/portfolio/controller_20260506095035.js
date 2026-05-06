import db from "../db/db.js";

const publicMenu = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<nav class="navbar navbar-dark bg-dark px-3">
  <div class="d-flex align-items-center gap-3">
    <a class="btn btn-outline-light btn-sm" href="/">Inicio</a>
  </div>

  <div class="d-flex align-items-center gap-2">
    <a class="btn btn-outline-light btn-sm" href="/portfolio">Ver portfolios</a>
    <a class="btn btn-outline-light btn-sm" href="/login">Login</a>
    <a class="btn btn-outline-success btn-sm" href="/register">Register</a>
  </div>
</nav>
`;

export const portfolio = async (req, res) => {
  const username = req.params.username;

  const [user] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (user.length === 0) return res.send("Usuario no encontrado");

  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id = ?",
    [user[0].id]
  );

  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id = ?",
    [user[0].id]
  );

  const isOwner =
    req.session.user && req.session.user.id === user[0].id;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Portfolio</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body class="bg-light">

      ${publicMenu}

      <div class="container mt-4">

        <div class="card p-4 mb-4">
          <h1>${user[0].username}</h1>
          <p>${user[0].bio || ""}</p>
          <p>${user[0].email}</p>

          ${isOwner ? `
            <a class="btn btn-dark mt-2" href="/dashboard">
              Gestionar portafolio
            </a>
          ` : ""}
        </div>

        <div class="row">

          <div class="col-md-6">
            <div class="card p-3">
              <h3>Redes sociales</h3>

              ${socials.map(s => `
                <div class="border rounded p-2 mb-2 bg-white">
                  <b>${s.platform}</b><br>
                  <a href="${s.url}" target="_blank">${s.url}</a>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="col-md-6">
            <div class="card p-3">
              <h3>Proyectos</h3>

              ${projects.map(p => `
                <div class="border rounded p-2 mb-2 bg-white">
                  <b>${p.title}</b>
                  <p class="mb-0">${p.description}</p>
                </div>
              `).join("")}
            </div>
          </div>

        </div>

      </div>

    </body>
    </html>
  `);
};