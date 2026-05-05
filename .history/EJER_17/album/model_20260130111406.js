import fs from "fs";

const ruta = "./data/albumes.json";

export function getAlbumes() {
  return JSON.parse(fs.readFileSync(ruta));
}

export function getAlbum(id) {
  return getAlbumes().find(a => a.id == id);
}

export function saveAlbum(album) {
  const albumes = getAlbumes();
  if (album.id) {
    const i = albumes.findIndex(a => a.id == album.id);
    albumes[i] = album;
  } else {
    album.id = Date.now();
    albumes.push(album);
  }
  fs.writeFileSync(ruta, JSON.stringify(albumes, null, 2));
}

export function deleteAlbum(id) {
  const albumes = getAlbumes().filter(a => a.id != id);
  fs.writeFileSync(ruta, JSON.stringify(albumes, null, 2));
}