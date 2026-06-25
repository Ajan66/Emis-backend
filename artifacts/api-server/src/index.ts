import app from "./app.js"; // உங்கள் app கோப்பை இம்போர்ட் செய்யவும்
import { logger } from "./lib/logger.js";
import cors from "cors";

// 1. CORS-ஐ ஆப்ஷனில் சேர்க்கவும் (அனைத்து டொமைன்களையும் அனுமதிக்க)
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

// 3. சர்வரை ஸ்டார்ட் செய்யவும்
app.listen(port, '0.0.0.0', () => {
  logger.info({ port }, "Server listening on port " + port);
});
