import express from "express";
import { portfolio } from "./controller.js";

const router = express.Router();

// IMPORTANTE: sin /portfolio aquí
router.get("/:username", portfolio);

export default router;