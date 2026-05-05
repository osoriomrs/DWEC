import express from "express";
import {
  getAllLibros,
  getLibroById,
  getLibrosPrestados
} from "./model.js";
import { renderHome, renderDetalle, renderPrestados } from "./view.js";
import { getPrestamosByLibro, getPrestamoActivo } from "../prestamo/model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const libros = await getAllLibros();
  res.send(renderHome(libros));
});

router.get("/prestados", async (req, res) => {
  const libros = await getLibrosPrestados();
  res.send(await renderPrestados(libros));
});

router.get("/libro/:id", async (req, res) => {
  const libro = await getLibroById(req.params.id);
  const historial = await getPrestamosByLibro(req.params.id);
  const activo = await getPrestamoActivo(req.params.id);

  res.send(renderDetalle(libro, historial, activo));
});

export default router;