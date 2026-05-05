export function renderListaArtistas(artistas = []) {
  let html = `<h1>Artistas</h1><a href="/artistas/form">Añadir artista</a><ul>`;

  artistas.forEach(a => {
    html += `
      <li>
        <img src="${a.foto}" width="80">
        <a href="/artistas/${a.id}">${a.nombre}</a>
        <a href="/artistas/form/${a.id}">Editar</a>
        <a href="/artistas/delete/${a.id}">Eliminar</a>
      </li>
    `;
  });

  html += "</ul>";
  return html;
}

export function renderFormArtista(artista) {
  return `
    <h1>${artista ? "Editar" : "Nuevo"} Artista</h1>
    <form method="POST" action="/artistas/save">
      ${artista ? `<input type="hidden" name="id" value="${artista.id}">` : ""}
      <input name="nombre" placeholder="Nombre" value="${artista?.nombre || ""}">
      <input name="pais" placeholder="País" value="${artista?.pais || ""}">
      <input name="genero" placeholder="Género" value="${artista?.genero || ""}">
      <input name="fecha_formacion" placeholder="Año formación" value="${artista?.fecha_formacion || ""}">
      <input name="foto" placeholder="URL foto" value="${artista?.foto || ""}">
      <button>Guardar</button>
    </form>
    <a href="/artistas">Volver</a>
  `;
}

export function renderDetalleArtista(artista, albumes = []) {
  let html = `
    <h1>${artista.nombre}</h1>
    <img src="${artista.foto}" width="150">
    <p>${artista.pais}</p>
    <p>${artista.genero}</p>
    <p>${artista.fecha_formacion}</p>
    <h2>Álbumes</h2>
    <ul>
  `;

  albumes.forEach(a => {
    html += `
      <li>
        <img src="${a.foto}" width="80">
        ${a.titulo} (${a.anio})
      </li>
    `;
  });

  html += `</ul><a href="/artistas">Volver</a>`;
  return html;
}
