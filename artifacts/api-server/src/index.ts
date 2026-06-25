
import express from "express";
import app from "./app.js";
import { logger } from "./lib/logger.js";
import cors from "cors";
import router from "./routes/index.js";

// 1. CORS மற்றும் JSON மிடில்வேர்களைச் சேர்த்தல்
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. ரவுட்டர்களைப் பயன்படுத்துதல்
app.use("/api", router);

// 3. போர்ட் சரிபார்ப்பு
const rawPort = process.env["PORT"];
if (!rawPort) {
  throw new Error("PORT environment variable is required.");
}

const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// 4. சர்வர் தொடக்கம்
app.listen(port, '0.0.0.0', () => {
  logger.info({ port }, "Server listening on port " + port);
});
