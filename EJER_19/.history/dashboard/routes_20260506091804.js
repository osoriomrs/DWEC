import express from "express";
import {
  dashboard,
  updateProfile,
  addProject,
  deleteProject,
  editProjectForm,
  editProject,
  addSocial,
  deleteSocial,
  editSocialForm,
  editSocial
} from "./controller.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

/* ===================== DASHBOARD ===================== */
router.get("/", auth, dashboard);

/* ===================== PROFILE ===================== */
router.post("/profile", auth, updateProfile);

/* ===================== PROJECTS ===================== */
router.post("/project", auth, addProject);
router.get("/project/delete/:id", auth, deleteProject);
router.get("/project/edit/:id", auth, editProjectForm);
router.post("/project/edit/:id", auth, editProject);

/* ===================== SOCIAL ===================== */
router.post("/social", auth, addSocial);
router.get("/social/delete/:id", auth, deleteSocial);
router.get("/social/edit/:id", auth, editSocialForm);
router.post("/social/edit/:id", auth, editSocial);

export default router;