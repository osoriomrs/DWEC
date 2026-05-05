import { albumes } from "../data/albumes" assert { type: "json" };
import { artistas } from "../data/artistas" assert { type: "json" };

export function listarAlbumes(req, res) {
  let html = "<h1>Álbumes</h1><ul>";
  albumes.forEach(a => {
    const artista = artistas.find(ar => ar.id === a.artistaId);
    html += `<li>${a.titulo} (${a.anio}) - ${artista ? artista.nombre : "Sin artista"} 
    <a href="/album/form/${a.id}">Editar</a> | 
    <a href="/album/delete/${a.id}">Eliminar</a></li>`;
  });
  html += "</ul><a href='/album/form'>Añadir nuevo álbum</a>";
  res.send(html);
}

export function formularioAlbum(req, res) {
  const id = req.params.id ? parseInt(req.params.id) : null;
  let album = { titulo: "", anio: "", artistaId: "" };
  if (id) album = albumes.find(a => a.id === id) || album;

  let html = `<form action="/album/save" method="POST">
  <input type="hidden" name="id" value="${id || ""}">
  Título: <input name="titulo" value="${album.titulo}"><br>
  Año: <input name="anio" value="${album.anio}"><br>
  Artista: <select name="artistaId">`;
  artistas.forEach(ar => {
    html += `<option value="${ar.id}" ${album.artistaId === ar.id ? "selected" : ""}>${ar.nombre}</option>`;
  });
  html += `</select><br><button type="submit">Guardar</button></form>`;
  res.send(html);
}

export function guardarAlbum(req, res) {
  const { id, titulo, anio, artistaId } = req.body;
  if (!titulo || !anio) return res.send("Título y año obligatorios");

  if (id) {
    const alb = albumes.find(a => a.id === parseInt(id));
    if (alb) { alb.titulo = titulo; alb.anio = parseInt(anio); alb.artistaId = parseInt(artistaId); }
  } else {
    const nuevoId = albumes.length ? Math.max(...albumes.map(a => a.id)) + 1 : 1;
    albumes.push({ id: nuevoId, titulo, anio: parseInt(anio), artistaId: parseInt(artistaId), foto: "https://picsum.photos/id/200/150/150" });
  }
  res.redirect("/albumes");
}

export function eliminarAlbum(req, res) {
  const id = parseInt(req.params.id);
  const index = albumes.findIndex(a => a.id === id);
  if (index >= 0) albumes.splice(index, 1);
  res.redirect("/albumes");
}
