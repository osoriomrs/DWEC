import { artistas } from "../data/artistas.js";
import { albumes } from "../data/albumes.js";
import { renderListaAlbumes, renderFormAlbum } from "./view.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  let html = "<h1>Artistas</h1><ul>";
  artistas.forEach(a => {
    html += `<li><a href="/artistas/${a.id}"><img src="${a.foto}" width="50"> ${a.nombre}</a></li>`;
  });
  html += "</ul>";
  res.send(html);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const artista = artistas.find(a => a.id === id);
  if (!artista) return res.status(404).send("Artista no encontrado");

  const discos = albumes.filter(alb => alb.artistaId === id);

  let html = `
    <h1>${artista.nombre}</h1>
    <img src="${artista.foto}" width="150">
    <p>País: ${artista.pais}</p>
    <p>Género: ${artista.genero}</p>
    <p>Formación: ${artista.fecha_formacion}</p>
    <h2>Álbumes</h2>
    <ul>
  `;
  discos.forEach(d => {
    html += `<li>${d.titulo} (${d.anio}) <img src="${d.foto}" width="50"></li>`;
  });
  html += "</ul>";

  res.send(html);
});

export default router;
