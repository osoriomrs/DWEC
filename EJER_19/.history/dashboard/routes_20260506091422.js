import express from "express";
import {
  dashboard,
  addProject,
  deleteProject,
  addSocial,
  deleteSocial
} from "./controller.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, dashboard);

router.post("/profile", auth, updateProfile);

// projects
router.post("/project", auth, addProject);
router.get("/project/delete/:id", auth, deleteProject);

// socials
router.post("/social", auth, addSocial);
router.get("/social/delete/:id", auth, deleteSocial);

export default router;