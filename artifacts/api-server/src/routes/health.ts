import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// index.ts-இல் ஏற்கனவே "/health" என்று கொடுத்துள்ளோம்.
// எனவே, இங்கிருந்து "/" என்று கொடுத்தால் மட்டுமே அது சரியாக வேலை செய்யும்.
router.get("/", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
