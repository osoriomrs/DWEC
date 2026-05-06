import express from "express";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./users/routes.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// RUTAS
app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});