export const renderHome = (libros) => {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <h1>Catálogo de libros</h1>

    <a href="/prestados">Ver prestados</a> | 
    <a href="/vencidos">Ver vencidos</a>

    <table>
      <tr>
        <th>Título</th>
        <th>Autor</th>
        <th>Estado</th>
      </tr>
      ${libros.map(l => `
        <tr>
          <td><a href="/libro/${l.id}">${l.titulo}</a></td>
          <td>${l.autor}</td>
          <td>${l.estado}</td>
        </tr>
      `).join("")}
    </table>
  </body>
  </html>
  `;
};

export const renderDetalle = (libro, historial, activo) => {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>

    <h1>${libro.titulo}</h1>
    <p><b>Autor:</b> ${libro.autor}</p>
    <p><b>ISBN:</b> ${libro.isbn}</p>
    <p><b>Estado:</b> ${libro.estado}</p>

    ${libro.estado === "Disponible"
      ? `<a href="/prestamo/formulario/${libro.id}"><button>Prestar libro</button></a>`
      : `
        <p><b>Prestado a:</b> ${activo?.nombre_prestatario}</p>
        <p><b>Devuelve:</b> ${activo?.fecha_devolucion}</p>
        <a href="/prestamo/devolver/${libro.id}"><button>Registrar devolución</button></a>
      `
    }

    <h2>Historial</h2>

    <table>
      <tr>
        <th>Usuario</th>
        <th>Préstamo</th>
        <th>Devolución</th>
        <th>Entrega</th>
      </tr>

      ${historial.map(p => `
        <tr>
          <td>${p.nombre_prestatario}</td>
          <td>${p.fecha_prestamo}</td>
          <td>${p.fecha_devolucion}</td>
          <td>${p.fecha_entrega || "-"}</td>
        </tr>
      `).join("")}
    </table>

    <br>
    <a href="/"><button>Volver</button></a>

  </body>
  </html>
  `;
};

export const renderPrestados = (libros) => {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>

    <h1>Libros prestados</h1>

    <a href="/">Inicio</a>

    <table>
      <tr>
        <th>Título</th>
        <th>Autor</th>
      </tr>

      ${libros.map(l => `
        <tr>
          <td>${l.titulo}</td>
          <td>${l.autor}</td>
        </tr>
      `).join("")}
    </table>

  </body>
  </html>
  `;
};