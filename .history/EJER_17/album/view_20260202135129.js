export function renderListaAlbumes(albumes = [], artistas = []) {
  return `
    <h1>Álbumes</h1>
    <a href="/albumes/form">Añadir nuevo álbum</a>

    <ul>
      ${albumes.map(a => {
        const artista = artistas.find(ar => ar.id === a.artistaId);
        return `
          <li>
            <img src="${a.foto}" width="80">
            <strong>${a.titulo}</strong> (${a.anio}) - ${artista?.nombre || "Desconocido"}
          </li>
        `;
      }).join("")}
    </ul>

    <a href="/">Inicio</a>
  `;
}

export function renderFormAlbum(album = null, artistas = []) {
  return `
    <h1>${album ? "Editar álbum" : "Nuevo álbum"}</h1>

    <form method="POST" action="/albumes/save">
      <input type="hidden" name="id" value="${album?.id || ""}">
      <input name="titulo" placeholder="Título" value="${album?.titulo || ""}">
      <input name="anio" placeholder="Año" value="${album?.anio || ""}">
      <input name="foto" placeholder="URL Foto" value="${album?.foto || ""}">

      <select name="artistaId">
        ${artistas.map(a => `
          <option value="${a.id}" ${album?.artistaId == a.id ? "selected" : ""}>
            ${a.nombre}
          </option>
        `).join("")}
      </select>

      <button>Guardar</button>
    </form>

    <a href="/albumes">Volver</a>
  `;
}
