import express from "express";
import { albumes } from "../data/albumes.js";
import { renderListaAlbumes, renderFormAlbum } from "./view.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(renderListaAlbumes());
});

router.get("/form", (req, res) => {
  res.send(renderFormAlbum());
});

router.get("/form/:id", (req, res) => {
  const album = albumes.find(a => a.id == req.params.id);
  if (!album) return res.send("Álbum no encontrado");
  res.send(renderFormAlbum(album));
});

router.post("/save", express.urlencoded({ extended: true }), (req, res) => {
  const { id, titulo, anio, artistaId, foto } = req.body;

  if (!titulo || !anio) return res.send(renderFormAlbum(req.body, "Título y año obligatorios"));

  if (id) {
    const album = albumes.find(a => a.id == id);
    Object.assign(album, { titulo, anio: +anio, artistaId: +artistaId, foto });
  } else {
    albumes.push({ id: albumes.length + 1, titulo, anio: +anio, artistaId: +artistaId, foto });
  }

  res.redirect("/albumes");
});

router.get("/delete/:id", (req, res) => {
  const index = albumes.findIndex(a => a.id == req.params.id);
  if (index >= 0) albumes.splice(index, 1);
  res.redirect("/albumes");
});

export default router; // <--- esto es clave
