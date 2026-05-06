import express from "express";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";

import db from "./db/db.js";

import userRoutes from "./users/routes.js";
import portfolioRoutes from "./portfolio/routes.js";
import dashboardRoutes from "./dashboard/routes.js";

dotenv.config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

/* ===================== RUTA INICIO ===================== */
app.get("/", async (req, res) => {
  const [users] = await db.query("SELECT username FROM users");

  res.send(`
    <h1>Portfolios</h1>

    ${users.map(u => `
      <p>
        <a href="/portfolio/${u.username}">
          ${u.username}
        </a>
      </p>
    `).join("")}
  `);
});

/* ===================== RUTAS ===================== */
app.use("/", userRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/dashboard", dashboardRoutes);

/* ===================== SERVER ===================== */
app.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});