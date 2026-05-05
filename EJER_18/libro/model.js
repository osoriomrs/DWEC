import db from "../config/db.js";

export const getAllLibros = async () => {
  const [rows] = await db.query("SELECT * FROM libros");
  return rows;
};

export const getLibroById = async (id) => {
  const [rows] = await db.query("SELECT * FROM libros WHERE id = ?", [id]);
  return rows[0];
};

export const getLibrosPrestados = async () => {
  const [rows] = await db.query("SELECT * FROM libros WHERE estado='Prestado'");
  return rows;
};

export const actualizarEstadoLibro = async (id, estado) => {
  await db.query("UPDATE libros SET estado=? WHERE id=?", [estado, id]);
};