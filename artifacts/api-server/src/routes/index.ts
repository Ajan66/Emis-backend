import { Router } from "express";
import healthRouter from "./health.js";
import emisRouter from "./emis.js";
import uploadRouter from "./upload"; 

const router = Router();

// Register the sub-routers with specific paths
router.use("/health", healthRouter);
router.use("/emis", emisRouter);
router.use("/upload", uploadRouter);

export default router;
