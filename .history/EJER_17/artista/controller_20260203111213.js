import express from "express";
import { artistas } from "../data/artistas.js";
import { albumes } from "../data/albumes.js";
import { renderListaArtistas, renderFormArtista, renderDetalleArtista } from "./view.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(renderListaArtistas(artistas));
});

router.get("/form", (req, res) => {
  res.send(renderFormArtista(null));
});

router.get("/form/:id", (req, res) => {
  const artista = artistas.find(a => a.id == req.params.id);
  res.send(renderFormArtista(artista));
});

router.post("/save", (req, res) => {
  const { id, nombre, pais, genero, fecha_formacion, foto } = req.body;

  if (id) {
    const a = artistas.find(ar => ar.id == id);
    a.nombre = nombre;
    a.pais = pais;
    a.genero = genero;
    a.fecha_formacion = fecha_formacion;
    a.foto = foto;
  } else {
    artistas.push({
      id: Date.now(),
      nombre,
      pais,
      genero,
      fecha_formacion,
      foto
    });
  }

  res.redirect("/artistas");
});

router.get("/delete/:id", (req, res) => {
  const index = artistas.findIndex(a => a.id == req.params.id);
  if (index !== -1) artistas.splice(index, 1);
  res.redirect("/artistas");
});

router.get("/:id", (req, res) => {
  const artista = artistas.find(a => a.id == req.params.id);
  const albums = albumes.filter(al => al.artistaId == artista.id);
  res.send(renderDetalleArtista(artista, albums));
});

export default router;
