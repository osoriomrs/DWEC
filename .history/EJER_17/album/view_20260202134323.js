export function renderListaAlbumes(albumes = [], artistas = []) {
  let html = `
    <h1>Álbumes</h1>
    <a href="/albumes/form">Añadir álbum</a>
    <table border="1">
      <tr>
        <th>Foto</th>
        <th>Título</th>
        <th>Año</th>
        <th>Artista</th>
        <th>Acciones</th>
      </tr>
  `;

  albumes.forEach(a => {
    const artista = artistas.find(ar => ar.id == a.artistaId);
    html += `
      <tr>
        <td><img src="${a.foto || 'https://via.placeholder.com/80'}"></td>
        <td>${a.titulo}</td>
        <td>${a.anio}</td>
        <td>${artista ? artista.nombre : "Desconocido"}</td>
        <td>
          <a href="/albumes/form/${a.id}">Editar</a>
          <a href="/albumes/delete/${a.id}">Eliminar</a>
        </td>
      </tr>
    `;
  });

  html += `</table>`;
  return html;
}

export function renderFormAlbum(album = null, artistas = [], error = "") {
  return `
    <h1>${album ? "Editar álbum" : "Nuevo álbum"}</h1>
    ${error ? `<p style="color:red">${error}</p>` : ""}
    <form method="POST" action="/albumes/save">
      <input type="hidden" name="id" value="${album?.id || ""}">
      <input name="titulo" placeholder="Título" value="${album?.titulo || ""}">
      <input name="anio" placeholder="Año" value="${album?.anio || ""}">
      <input name="foto" placeholder="URL Foto" value="${album?.foto || ""}">
      <select name="artistaId">
        ${artistas.map(a =>
          `<option value="${a.id}" ${album?.artistaId == a.id ? "selected" : ""}>
            ${a.nombre}
          </option>`
        ).join("")}
      </select>
      <button>Guardar</button>
    </form>
    <a href="/albumes">Volver</a>
  `;
}
