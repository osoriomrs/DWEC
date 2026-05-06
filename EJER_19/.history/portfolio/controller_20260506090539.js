import db from "../db/db.js";

const publicMenu = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<nav class="navbar navbar-light bg-light px-3">
  <a class="navbar-brand" href="/">Inicio</a>
  <div>
    <a class="btn btn-outline-primary me-2" href="/login">Login</a>
    <a class="btn btn-outline-success" href="/register">Register</a>
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
    ${publicMenu}

    <div class="container mt-4">
      <h1>${user[0].username}</h1>
      <p>${user[0].bio || ""}</p>
      <p>${user[0].email}</p>

      <h3>Redes</h3>
      ${socials.map(s => `
        <p>${s.platform}: <a href="${s.url}" target="_blank">${s.url}</a></p>
      `).join("")}

      <h3>Proyectos</h3>
      ${projects.map(p => `
        <p><strong>${p.title}</strong> - ${p.description}</p>
      `).join("")}

      ${isOwner ? `<a class="btn btn-dark mt-3" href="/dashboard">Gestionar portafolio</a>` : ""}
    </div>
  `);
};