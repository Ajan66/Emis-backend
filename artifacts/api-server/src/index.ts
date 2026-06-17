import app from "./app";
import { logger } from "./lib/logger";
import cors from "cors"; // 1. CORS-ஐ இம்போர்ட் செய்யவும்

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// 2. CORS-ஐ ஆப்ஷனில் சேர்க்கவும்
app.use(cors({
  origin: '*', // உங்கள் Frontend தளத்திற்கு அனுமதி வழங்குகிறது
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// 3. சர்வரை ஸ்டார்ட் செய்யவும் (callback-ஐ தனித்தனியாகக் கையாளுதல்)
app.listen(port, '0.0.0.0', () => {
  logger.info({ port }, "Server listening");
});
