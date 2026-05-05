import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import albumRoutes from "./album/album.controller.js";
import artistaRoutes from "./artista/artista.controller.js";
import homeView from "./views/home.view.js";

const app = express();
const PORT = 3000;

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(homeView());
});

app.use("/albumes", albumRoutes);
app.use("/artistas", artistaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
