import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import emisRouter from "./emis.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(emisRouter);

export default router;
