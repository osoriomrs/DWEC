import db from "../db/db.js";

export const portfolio = async (req, res) => {
  const username = req.params.username;

  const [user] = await db.query(
    "SELECT * FROM users WHERE username=?",
    [username]
  );

  if (user.length === 0) return res.send("Usuario no encontrado");

  const userId = user[0].id;

  const [projects] = await db.query(
    "SELECT * FROM projects WHERE user_id=?",
    [userId]
  );

  const [socials] = await db.query(
    "SELECT * FROM social_links WHERE user_id=?",
    [userId]
  );

  const isOwner =
    req.session.user && req.session.user.id === userId;

  res.send(`
    <h1>${user[0].username}</h1>
    <p>${user[0].bio || ""}</p>
    <p>${user[0].email}</p>

    <h2>Redes</h2>
    ${socials.map(s => `
      <p><a href="${s.url}">${s.platform}</a></p>
    `).join("")}

    <h2>Proyectos</h2>
    ${projects.map(p => `
      <p>${p.title} - ${p.description}</p>
    `).join("")}

    ${isOwner ? `<a href="/dashboard">Gestionar portafolio</a>` : ""}
  `);
};