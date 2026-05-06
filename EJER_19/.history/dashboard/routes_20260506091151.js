import express from "express";
import {
  dashboard,
  updateProfile,
  addProject,
  deleteProject,
  addSocial,
  deleteSocial
} from "./controller.js";

import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isAuth, dashboard);

router.post("/profile", isAuth, updateProfile);

// projects
router.post("/project", isAuth, addProject);
router.get("/project/delete/:id", isAuth, deleteProject);

// socials
router.post("/social", isAuth, addSocial);
router.get("/social/delete/:id", isAuth, deleteSocial);

export default router;