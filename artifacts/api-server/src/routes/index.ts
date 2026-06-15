import { Router, type IRouter } from "express";
import healthRouter from "./health";
import uploadRouter from "./upload";
import emisRouter from "./emis"; // <-- Line 1: Imports your new EMIS logic

const router: IRouter = Router();

router.use(healthRouter);
router.use(uploadRouter);
router.use(emisRouter); // <-- Line 2: Makes the /analyze and /push paths live

export default router;
