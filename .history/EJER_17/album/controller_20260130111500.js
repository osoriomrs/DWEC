import express from "express";
import { getAlbumes, getAlbum, saveAlbum, deleteAlbum } from "./model.js";
import { getArtistas } from "../artista/model.js";
import { listaAlbumes, formAlbum } from "./view.js";

const router = express.Router();

router.get("/", (req, res) => {
  const albumes = getAlbumes();
  const artistas = getArtistas();
  res.send(listaAlbumes(albumes, artistas));
});

router.get("/form/:id?", (req, res) => {
  const album = req.params.id ? getAlbum(req.params.id) : null;
  const artistas = getArtistas();
  res.send(formAlbum(album, artistas));
});

router.post("/save", (req, res) => {
  saveAlbum({
    id: req.body.id,
    titulo: req.body.titulo,
    anio: req.body.anio,
    artistaId: req.body.artistaId,
    foto: req.body.foto
  });
  res.redirect("/albumes");
});

router.get("/delete/:id", (req, res) => {
  deleteAlbum(req.params.id);
  res.redirect("/albumes");
});

export default router;
