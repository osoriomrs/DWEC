import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import artistaController from "./artista/controller.js";
import albumController from "./album/controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "styles"))); // carpeta de CSS/imagenes
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas principales
app.get("/", (req, res) => {
    res.send(`
        <h1>Bienvenido a la Discoteca Virtual</h1>
        <ul>
            <li><a href="/albumes">Ver Álbumes</a></li>
            <li><a href="/artistas">Ver Artistas</a></li>
        </ul>
    `);
});

// Rutas de artistas y álbumes
app.use("/artistas", artistaController);
app.use("/albumes", albumController);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}`);
});
