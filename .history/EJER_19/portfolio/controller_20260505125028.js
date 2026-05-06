import db from "../db/db.js";
import path from "path";

export const portfolio = async (req, res) => {
  const username = req.params.username;

  const [users] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (users.length === 0) {
    return res.send("Usuario no encontrado");
  }

  const user = users[0];

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

  // 🔥 guardamos datos para la vista (forma simple tipo clase)
  req.session.portfolioData = {
    user,
    projects,
    socials,
    isOwner
  };

  res.sendFile(path.resolve("views/portfolio/portfolio.html"));
};