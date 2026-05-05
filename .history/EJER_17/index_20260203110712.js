import express from "express";
import albumController from "./album/controller.js";
import artistaController from "./artista/controller.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/styles", express.static("styles"));

app.get("/", (req, res) => {
  res.send(`
    <h1>Discoteca Virtual</h1>
    <a href="/albumes">Ver Álbumes</a><br>
    <a href="/artistas">Ver Artistas</a>
  `);
});

app.use("/albumes", albumController);
app.use("/artistas", artistaController);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
