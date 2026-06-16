import { Router } from "express";
import healthRouter from "./health.js";
import emisRouter from "./emis.js";
import uploadRouter from "./upload.js";

const router = Router();

// Register the sub-routers
router.use(healthRouter);
router.use(emisRouter);
router.use(uploadRouter);

export default router;
