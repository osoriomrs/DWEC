import { albumes } from "../data/albumes.js";
import { artistas } from "../data/artistas.js";

export function listarAlbumes() {
  return albumes.map(a => {
    const artista = artistas.find(ar => ar.id === a.artistaId);
    return { ...a, artistaNombre: artista ? artista.nombre : "Desconocido" };
  });
}

export function obtenerAlbum(id) {
  return albumes.find(a => a.id === Number(id));
}

export function guardarAlbum(nuevo) {
  if (!nuevo.titulo || !nuevo.anio) return false;
  const id = albumes.length ? Math.max(...albumes.map(a => a.id)) + 1 : 1;
  albumes.push({ id, ...nuevo });
  return true;
}

export function eliminarAlbum(id) {
  const index = albumes.findIndex(a => a.id === Number(id));
  if (index === -1) return false;
  albumes.splice(index, 1);
  return true;
}
