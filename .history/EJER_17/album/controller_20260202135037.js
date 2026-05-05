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

export default router;
