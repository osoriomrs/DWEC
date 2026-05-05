export function renderListaAlbumes(albumes=[], artistas=[]) {
  let html = `<h1>Álbumes</h1><a href="/albumes/form">Añadir nuevo álbum</a><table border="1" cellpadding="5">
    <tr><th>ID</th><th>Título</th><th>Año</th><th>Artista</th><th>Foto</th><th>Acciones</th></tr>`;
  
  albumes.forEach(a => {
    const artista = artistas.find(ar => ar.id === a.artistaId);
    html += `<tr>
      <td>${a.id}</td>
      <td>${a.titulo}</td>
      <td>${a.anio}</td>
      <td>${artista ? artista.nombre : "Desconocido"}</td>
      <td><img src="${a.foto}" width="50"></td>
      <td>
        <a href="/albumes/form/${a.id}">Editar</a> |
        <a href="/albumes/delete/${a.id}">Eliminar</a>
      </td>
    </tr>`;
  });

  html += `</table>`;
  return html;
}

export function renderFormAlbum(album, artistas) {
  const isEdit = !!album;
  let html = `<h1>${isEdit ? "Editar" : "Crear"} Álbum</h1>
  <form method="POST" action="/albumes/save">
    <input type="hidden" name="id" value="${isEdit ? album.id : ""}">
    <label>Título:</label>
    <input type="text" name="titulo" value="${isEdit ? album.titulo : ""}" required><br>
    <label>Año:</label>
    <input type="number" name="anio" value="${isEdit ? album.anio : ""}" required><br>
    <label>Artista:</label>
    <select name="artistaId" required>
      ${artistas.map(ar => `<option value="${ar.id}" ${isEdit && ar.id === album.artistaId ? "selected" : ""}>${ar.nombre}</option>`).join("")}
    </select><br>
    <label>Foto URL:</label>
    <input type="text" name="foto" value="${isEdit ? album.foto : ""}"><br>
    <button type="submit">Guardar</button>
  </form>`;

  return html;
}
