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

import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

// protegemos todo
router.get("/", isAuth, dashboard);

router.post("/profile", isAuth, updateProfile);

// projects
router.post("/project", isAuth, addProject);
router.get("/project/delete/:id", isAuth, deleteProject);
router.get("/project/edit/:id", isAuth, editProjectForm);
router.post("/project/edit/:id", isAuth, editProject);

// socials
router.post("/social", isAuth, addSocial);
router.get("/social/delete/:id", isAuth, deleteSocial);
router.get("/social/edit/:id", isAuth, editSocialForm);
router.post("/social/edit/:id", isAuth, editSocial);

export default router;