import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import uploadRouter from "./upload.js";
import emisRouter from "./emis.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(uploadRouter);
router.use(emisRouter);

export default router;
