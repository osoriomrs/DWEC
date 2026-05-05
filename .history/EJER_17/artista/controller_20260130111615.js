import express from "express";
import { getArtistas, getArtista } from "./model.js";
import { getAlbumes } from "../album/model.js";
import { listaArtistas, fichaArtista } from "./view.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(listaArtistas(getArtistas()));
});

router.get("/:id", (req, res) => {
  const artista = getArtista(req.params.id);
  const albumes = getAlbumes().filter(a => a.artistaId == artista.id);
  res.send(fichaArtista(artista, albumes));
});

export default router;
