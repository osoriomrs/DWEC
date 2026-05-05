import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import { listarAlbumes } from "./album/controller.js";
import { listarArtistas } from "./artista/controller.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("styles"));

const accessLogStream = fs.createWriteStream(path.join(".", "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.sendFile(path.join(".", "views", "index.html"));
});

app.get("/albumes", listarAlbumes);
app.get("/artistas", listarArtistas);

app.listen(3000, () => console.log("Servidor arrancado en http://localhost:3000"));
