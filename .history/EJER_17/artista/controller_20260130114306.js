import { artistas } from "../../data/artistas.js";
import { albumes } from "../../data/albumes.js";

export function listarArtistas() {
  return artistas;
}

export function obtenerArtista(id) {
  const artista = artistas.find(a => a.id === Number(id));
  if (!artista) return null;
  const alb = albumes.filter(a => a.artistaId === Number(id));
  return { ...artista, albumes: alb };
}

export function guardarArtista(nuevo) {
  if (!nuevo.nombre) return false;
  const id = artistas.length ? Math.max(...artistas.map(a => a.id)) + 1 : 1;
  artistas.push({ id, ...nuevo });
  return true;
}

export function eliminarArtista(id) {
  const index = artistas.findIndex(a => a.id === Number(id));
  if (index === -1) return false;
  artistas.splice(index, 1);
  return true;
}
