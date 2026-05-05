import { artistas } from "../data/artistas.json" assert { type: "json" };
import { albumes } from "../data/albumes.json" assert { type: "json" };

export function listarArtistas(req, res) {
  let html = "<h1>Artistas</h1><ul>";
  artistas.forEach(a => {
    html += `<li><a href="/artista/${a.id}">${a.nombre}</a></li>`;
  });
  html += "</ul>";
  res.send(html);
}

export function detalleArtista(req, res) {
  const id = parseInt(req.params.id);
  const artista = artistas.find(a => a.id === id);
  if (!artista) return res.send("Artista no encontrado");

  const misAlbumes = albumes.filter(al => al.artistaId === id);
  let html = `<h1>${artista.nombre}</h1><p>${artista.pais} - ${artista.genero} - ${artista.fecha_formacion}</p><h2>Álbumes</h2><ul>`;
  misAlbumes.forEach(a => {
    html += `<li>${a.titulo} (${a.anio})</li>`;
  });
  html += "</ul>";
  res.send(html);
}
