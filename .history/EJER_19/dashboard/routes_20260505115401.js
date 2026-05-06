import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  dashboard,
  addProject,
  deleteProject,
  addSocial,
  deleteSocial,
} from "./controller.js";

const router = express.Router();

router.get("/dashboard", isAuth, dashboard);

router.post("/dashboard/project", isAuth, addProject);
router.get("/dashboard/project/delete/:id", isAuth, deleteProject);

router.post("/dashboard/social", isAuth, addSocial);
router.get("/dashboard/social/delete/:id", isAuth, deleteSocial);

export default router;