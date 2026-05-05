import express from "express";
import { artistas, albumes } from "../data/artistas.js"; 
import { renderListaArtistas, renderFichaArtista, renderFormArtista } from "./view.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(renderListaArtistas());
});

router.get("/:id", (req, res) => {
    const artista = artistas.find(a => a.id == req.params.id);
    if (!artista) return res.send("Artista no encontrado");
    const albumsArtista = albumes.filter(alb => alb.artistaId == artista.id);
    res.send(renderFichaArtista(artista, albumsArtista));
});

router.get("/form", (req, res) => {
    res.send(renderFormArtista());
});

router.get("/form/:id", (req, res) => {
    const artista = artistas.find(a => a.id == req.params.id);
    if (!artista) return res.send("Artista no encontrado");
    res.send(renderFormArtista(artista));
});

router.post("/save", express.urlencoded({ extended: true }), (req, res) => {
    const { id, nombre, pais, genero, fecha_formacion, foto } = req.body;

    if (!nombre || !pais) return res.send(renderFormArtista(req.body, "Nombre y país obligatorios"));

    if (id) {
        const artista = artistas.find(a => a.id == id);
        Object.assign(artista, { nombre, pais, genero, fecha_formacion: +fecha_formacion, foto });
    } else {
        artistas.push({ id: artistas.length + 1, nombre, pais, genero, fecha_formacion: +fecha_formacion, foto });
    }

    res.redirect("/artistas");
});

router.get("/delete/:id", (req, res) => {
    const index = artistas.findIndex(a => a.id == req.params.id);
    if (index >= 0) artistas.splice(index, 1);
    res.redirect("/artistas");
});

export default router;
