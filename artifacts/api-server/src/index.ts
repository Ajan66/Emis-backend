import express from "express";
import app from "./app.js";
import { logger } from "./lib/logger.js";
import cors from "cors";
import router from "./routes/index.js"; // routes இம்போர்ட் சேர்க்கப்பட்டது

// CORS மற்றும் JSON middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// உங்கள் ரவுட்டர்களை இங்கே பயன்படுத்தவும்
app.use("/api", router);

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// சர்வர் ஸ்டார்ட்
app.listen(port, '0.0.0.0', () => {
  logger.info({ port }, "Server listening on port " + port);
});
