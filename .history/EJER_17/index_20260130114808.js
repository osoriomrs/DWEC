import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import albumController from "./album/controller.js";
import artistaController from "./artista/controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "styles")));

app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenido a la Discoteca Virtual</h1>
    <ul>
      <li><a href="/albumes">Ver Álbumes</a></li>
      <li><a href="/artistas">Ver Artistas</a></li>
    </ul>
  `);
});

app.use("/albumes", albumController);
app.use("/artista", artistaController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
