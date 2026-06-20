import { Router } from "express";
import healthRouter from "./health";
import emisRouter from "./emis";
import uploadRouter from "./upload";

const router = Router();

// Register the sub-routers
router.use("/health", healthRouter);

// emisRouter-ஐ நேரடியாக ரூட் (/) பாதையில் இணைக்கவும், 
// அப்போதுதான் அது /analyze போன்ற ரவுட்டர்களை ஏற்கும்
router.use("/", emisRouter); 

router.use("/upload", uploadRouter);

export default router;
