export function renderListaAlbumes(albumes = [], artistas = []) {
  let html = `<h1>Álbumes</h1><a href="/albumes/form">Añadir nuevo álbum</a><ul>`;

  albumes.forEach(a => {
    const artista = artistas.find(ar => ar.id === a.artistaId);
    html += `
      <li>
        <img src="${a.foto}" width="80">
        ${a.titulo} (${a.anio}) - ${artista?.nombre || "Desconocido"}
        <a href="/albumes/form/${a.id}">Editar</a>
        <a href="/albumes/delete/${a.id}">Eliminar</a>
      </li>
    `;
  });

  html += "</ul>";
  return html;
}

export function renderFormAlbum(album, artistas = []) {
  return `
    <h1>${album ? "Editar" : "Nuevo"} Álbum</h1>
    <form method="POST" action="/albumes/save">
      ${album ? `<input type="hidden" name="id" value="${album.id}">` : ""}
      <input name="titulo" placeholder="Título" value="${album?.titulo || ""}">
      <input name="anio" placeholder="Año" value="${album?.anio || ""}">
      <input name="foto" placeholder="URL foto" value="${album?.foto || ""}">
      <select name="artistaId">
        ${artistas.map(a => `
          <option value="${a.id}" ${album?.artistaId === a.id ? "selected" : ""}>
            ${a.nombre}
          </option>
        `).join("")}
      </select>
      <button>Guardar</button>
    </form>
    <a href="/albumes">Volver</a>
  `;
}
