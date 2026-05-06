import db from "../db/db.js";

export const portfolio = async (req, res) => {
  const username = req.params.username;

  const [userRows] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (userRows.length === 0) {
    return res.send("<h1>Usuario no encontrado</h1>");
  }

  const user = userRows[0];

  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id = ?",
    [user.id]
  );

  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id = ?",
    [user.id]
  );

  const isOwner =
    req.session.user && req.session.user.id === user.id;

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container mt-4">

  <div class="card p-4 shadow">
    <h1>${user.username}</h1>
    <p>${user.bio || "Sin bio"}</p>
    <p><strong>${user.email}</strong></p>

    ${isOwner ? `<a class="btn btn-primary" href="/dashboard">Gestionar portafolio</a>` : ""}
  </div>

  <h3 class="mt-4">Redes sociales</h3>
  ${socials.map(s => `
    <div class="card p-2 mb-2">
      <strong>${s.platform}</strong> -
      <a href="${s.url}" target="_blank">${s.url}</a>
    </div>
  `).join("")}

  <h3 class="mt-4">Proyectos</h3>
  ${projects.map(p => `
    <div class="card p-2 mb-2">
      <h5>${p.title}</h5>
      <p>${p.description}</p>
    </div>
  `).join("")}

</div>

</body>
</html>
  `);
};