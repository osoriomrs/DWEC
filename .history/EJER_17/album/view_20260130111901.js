export function listaAlbumes(albumes, artistas) {
  return `
  <link rel="stylesheet" href="/style.css">
  <h1>Álbumes</h1>
  <a href="/albumes/form">Nuevo Álbum</a>
  <table>
    <tr><th>Foto</th><th>Título</th><th>Artista</th><th>Año</th><th></th></tr>
    ${albumes.map(a => `
      <tr>
        <td><img src="${a.foto}"></td>
        <td>${a.titulo}</td>
        <td>${artistas.find(ar => ar.id == a.artistaId)?.nombre}</td>
        <td>${a.anio}</td>
        <td>
          <a href="/albumes/form/${a.id}">Editar</a>
          <a href="/albumes/delete/${a.id}">Eliminar</a>
        </td>
      </tr>
    `).join("")}
  </table>
  `;
}

export function formAlbum(album, artistas) {
  return `
  <link rel="stylesheet" href="/style.css">
  <h1>${album ? "Editar" : "Nuevo"} Álbum</h1>
  <form method="POST" action="/albumes/save">
    <input type="hidden" name="id" value="${album?.id || ""}">
    <input name="titulo" value="${album?.titulo || ""}" placeholder="Título">
    <input name="anio" value="${album?.anio || ""}" placeholder="Año">
    <input name="foto" value="${album?.foto || ""}" placeholder="URL Foto">
    <select name="artistaId">
      ${artistas.map(a => `
        <option value="${a.id}" ${album?.artistaId == a.id ? "selected" : ""}>
          ${a.nombre}
        </option>
      `).join("")}
    </select>
    <button>Guardar</button>
  </form>
  `;
}
