export function listaArtistas(artistas) {
  return `
  <link rel="stylesheet" href="/style.css">
  <h1>Artistas</h1>
  <div class="grid">
    ${artistas.map(a => `
      <a href="/artistas/${a.id}">
        <img src="${a.foto}">
        <p>${a.nombre}</p>
      </a>
    `).join("")}
  </div>
  `;
}

export function fichaArtista(a, albumes) {
  return `
  <link rel="stylesheet" href="/style.css">
  <h1>${a.nombre}</h1>
  <img src="${a.foto}">
  <p>${a.pais} - ${a.genero} - ${a.fecha_formacion}</p>
  <h2>Álbumes</h2>
  <ul>
    ${albumes.map(al => `
      <li>
        <img src="${al.foto}">
        ${al.titulo} (${al.anio})
      </li>
    `).join("")}
  </ul>
  `;
}
