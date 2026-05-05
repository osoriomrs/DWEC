export const renderFormulario = (libroId) => {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>

    <h1>Prestar libro</h1>

    <form method="POST" action="/prestamo/nuevo">
      <input type="hidden" name="libro_id" value="${libroId}">

      <input type="text" name="nombre" placeholder="Nombre prestatario" required>
      <input type="date" name="fecha_prestamo" required>
      <input type="date" name="fecha_devolucion" required>

      <button type="submit">Prestar</button>
    </form>

    <a href="/libro/${libroId}">Volver</a>

  </body>
  </html>
  `;
};

export const renderUsuario = (nombre, datos) => {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>

    <h1>Libros prestados a: ${nombre}</h1>

    <a href="/">Inicio</a>

    <table>
      <tr>
        <th>Título</th>
        <th>Autor</th>
        <th>Devolución</th>
      </tr>

      ${datos.map(d => `
        <tr>
          <td>${d.titulo}</td>
          <td>${d.autor}</td>
          <td>${d.fecha_devolucion}</td>
        </tr>
      `).join("")}
    </table>

  </body>
  </html>
  `;
};

export const renderVencidos = (datos) => {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>

    <h1>Libros vencidos</h1>

    <a href="/">Inicio</a>

    <table>
      <tr>
        <th>Título</th>
        <th>Usuario</th>
        <th>Devolución</th>
      </tr>

      ${datos.map(d => `
        <tr>
          <td>${d.titulo}</td>
          <td>${d.nombre_prestatario}</td>
          <td>${d.fecha_devolucion}</td>
        </tr>
      `).join("")}
    </table>

  </body>
  </html>
  `;
};