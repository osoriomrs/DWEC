import express from "express";

import {
  dashboard,
  addProject,
  deleteProject,
  addSocial,
  deleteSocial
} from "./controller.js";

const router = express.Router();

// Dashboard principal
router.get("/", dashboard);

// PROYECTOS
router.post("/project", addProject);
router.get("/project/delete/:id", deleteProject);

// REDES SOCIALES
router.post("/social", addSocial);
router.get("/social/delete/:id", deleteSocial);

export default router;