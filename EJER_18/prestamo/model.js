import db from "../config/db.js";

export const getPrestamosByLibro = async (libroId) => {
  const [rows] = await db.query("SELECT * FROM prestamos WHERE libro_id=?", [libroId]);
  return rows;
};

export const getPrestamoActivo = async (libroId) => {
  const [rows] = await db.query(
    "SELECT * FROM prestamos WHERE libro_id=? AND fecha_entrega IS NULL",
    [libroId]
  );
  return rows[0];
};

export const crearPrestamo = async (datos) => {
  await db.query(
    "INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)",
    [datos.libro_id, datos.nombre, datos.fecha_prestamo, datos.fecha_devolucion]
  );
};

export const devolverLibro = async (libroId) => {
  await db.query(
    "UPDATE prestamos SET fecha_entrega=CURDATE() WHERE libro_id=? AND fecha_entrega IS NULL",
    [libroId]
  );
};

export const getPrestamosUsuario = async (nombre) => {
  const [rows] = await db.query(
    `SELECT libros.titulo, libros.autor, prestamos.fecha_devolucion 
     FROM prestamos 
     JOIN libros ON libros.id = prestamos.libro_id
     WHERE prestamos.nombre_prestatario=? AND fecha_entrega IS NULL`,
    [nombre]
  );
  return rows;
};

export const getVencidos = async () => {
  const [rows] = await db.query(
    `SELECT libros.titulo, prestamos.nombre_prestatario, prestamos.fecha_devolucion
     FROM prestamos
     JOIN libros ON libros.id = prestamos.libro_id
     WHERE fecha_entrega IS NULL AND fecha_devolucion < CURDATE()`
  );
  return rows;
};