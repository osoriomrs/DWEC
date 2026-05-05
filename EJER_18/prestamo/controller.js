import express from "express";
import {
  crearPrestamo,
  devolverLibro,
  getPrestamosUsuario,
  getVencidos
} from "./model.js";
import { actualizarEstadoLibro } from "../libro/model.js";
import { renderFormulario, renderUsuario, renderVencidos } from "./view.js";

const router = express.Router();

router.get("/prestamo/formulario/:id", (req, res) => {
  res.send(renderFormulario(req.params.id));
});

router.post("/prestamo/nuevo", async (req, res) => {
  await crearPrestamo(req.body);
  await actualizarEstadoLibro(req.body.libro_id, "Prestado");
  res.redirect("/libro/" + req.body.libro_id);
});

router.get("/prestamo/devolver/:id", async (req, res) => {
  await devolverLibro(req.params.id);
  await actualizarEstadoLibro(req.params.id, "Disponible");
  res.redirect("/libro/" + req.params.id);
});

router.get("/prestamos/usuario", async (req, res) => {
  const datos = await getPrestamosUsuario(req.query.nombre);
  res.send(renderUsuario(req.query.nombre, datos));
});

router.get("/vencidos", async (req, res) => {
  const datos = await getVencidos();
  res.send(renderVencidos(datos));
});

export default router;