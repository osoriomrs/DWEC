import express from "express";

import {
  dashboard,
  addProject,
  deleteProject,
  editProjectForm,
  editProject,
  addSocial,
  deleteSocial,
  editSocialForm,
  editSocial,
  updateProfile
} from "./controller.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

// 🔒 PROTEGER TODO EL DASHBOARD
router.use(auth);

// DASHBOARD
router.get("/", dashboard);

// PERFIL
router.post("/profile", updateProfile);

// PROYECTOS
router.post("/project", addProject);
router.get("/project/delete/:id", deleteProject);
router.get("/project/edit/:id", editProjectForm);
router.post("/project/edit/:id", editProject);

// REDES
router.post("/social", addSocial);
router.get("/social/delete/:id", deleteSocial);
router.get("/social/edit/:id", editSocialForm);
router.post("/social/edit/:id", editSocial);

export default router;