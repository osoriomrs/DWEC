import express from "express";
import { albumes } from "../data/albumes.js";
import { artistas } from "../data/artistas.js";
import { renderListaAlbumes, renderFormAlbum } from "./view.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(renderListaAlbumes(albumes, artistas));
});

router.get("/form", (req, res) => {
  res.send(renderFormAlbum(null, artistas));
});

router.get("/form/:id", (req, res) => {
  const album = albumes.find(a => a.id == req.params.id);
  res.send(renderFormAlbum(album, artistas));
});

router.post("/save", (req, res) => {
  const { id, titulo, anio, artistaId, foto } = req.body;

  if (!titulo || !anio) {
    res.send(renderFormAlbum(req.body, artistas, "Datos inválidos"));
    return;
  }

  if (id) {
    const album = albumes.find(a => a.id == id);
    album.titulo = titulo;
    album.anio = anio;
    album.artistaId = artistaId;
    album.foto = foto;
  } else {
    albumes.push({
      id: Date.now(),
      titulo,
      anio,
      artistaId,
      foto
    });
  }

  res.redirect("/albumes");
});

router.get("/delete/:id", (req, res) => {
  const index = albumes.findIndex(a => a.id == req.params.id);
  if (index !== -1) albumes.splice(index, 1);
  res.redirect("/albumes");
});

export default router;
