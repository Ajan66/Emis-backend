import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import emisRouter from "./emis.js";
import uploadRouter from "./upload.js"; // Import the missing router

const router: IRouter = Router();

router.use(healthRouter);
router.use(emisRouter);
router.use(uploadRouter); // Add this to register your upload/analyze routes

export default router;
