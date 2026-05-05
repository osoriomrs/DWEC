import fs from "fs";

const ruta = "./data/artistas.json";

export function getArtistas() {
  return JSON.parse(fs.readFileSync(ruta));
}

export function getArtista(id) {
  return getArtistas().find(a => a.id == id);
}
