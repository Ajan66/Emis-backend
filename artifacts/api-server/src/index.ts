import express from "express"; // எக்ஸ்பிரஸ்ஸை இம்போர்ட் செய்யவும்
import app from "./app.js";    // ./app.js என மாற்றவும்
import { logger } from "./lib/logger.js"; // ./lib/logger.js என மாற்றவும்
import cors from "cors";

// CORS-ஐ இம்போர்ட் செய்து பயன்படுத்தவும்
app.use(cors());

// JSON மற்றும் URL encoded டேட்டாவை ப்ராசஸ் செய்ய இது அவசியம்
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// சர்வரை ஸ்டார்ட் செய்யவும்
app.listen(port, '0.0.0.0', () => {
  logger.info({ port }, "Server listening on port " + port);
});
