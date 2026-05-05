export function renderListaArtistas(artistas = []) {
  let html = `
    <html>
    <head>
      <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
      <h1>Artistas</h1>
      <a class="btn" href="/artistas/form">Añadir artista</a>
      <div class="grid">
  `;

  artistas.forEach(a => {
    html += `
      <div class="card">
        <img src="${a.foto}">
        <h3>${a.nombre}</h3>
        <p>${a.genero}</p>
        <a class="btn small" href="/artistas/${a.id}">Ver</a>
        <a class="btn small warning" href="/artistas/form/${a.id}">Editar</a>
        <a class="btn small danger" href="/artistas/delete/${a.id}">Eliminar</a>
      </div>
    `;
  });

  html += `
      </div>
      <a class="btn secondary" href="/">Inicio</a>
    </body>
    </html>
  `;

  return html;
}

export function renderFormArtista(artista) {
  return `
    <html>
    <head>
      <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
      <h1>${artista ? "Editar artista" : "Nuevo artista"}</h1>

      <form method="POST" action="/artistas/save" class="form">
        ${artista ? `<input type="hidden" name="id" value="${artista.id}">` : ""}
        <input name="nombre" placeholder="Nombre" value="${artista?.nombre || ""}" required>
        <input name="pais" placeholder="País" value="${artista?.pais || ""}" required>
        <input name="genero" placeholder="Género" value="${artista?.genero || ""}" required>
        <input name="fecha_formacion" placeholder="Año formación" value="${artista?.fecha_formacion || ""}" required>
        <input name="foto" placeholder="URL foto" value="${artista?.foto || ""}" required>
        <button class="btn">Guardar</button>
      </form>

      <a class="btn secondary" href="/artistas">Volver</a>
    </body>
    </html>
  `;
}

export function renderDetalleArtista(artista, albumes = []) {
  let html = `
    <html>
    <head>
      <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
      <div class="card detail">
        <img src="${artista.foto}">
        <h2>${artista.nombre}</h2>
        <p>${artista.pais}</p>
        <p>${artista.genero}</p>
        <p>${artista.fecha_formacion}</p>
        <a class="btn warning" href="/artistas/form/${artista.id}">Editar</a>
        <a class="btn danger" href="/artistas/delete/${artista.id}">Eliminar</a>
      </div>

      <h2>Álbumes</h2>
      <div class="grid">
  `;

  albumes.forEach(a => {
    html += `
      <div class="card">
        <img src="${a.foto}">
        <h4>${a.titulo}</h4>
        <p>${a.anio}</p>
      </div>
    `;
  });

  html += `
      </div>
      <a class="btn secondary" href="/artistas">Volver</a>
    </body>
    </html>
  `;

  return html;
}
