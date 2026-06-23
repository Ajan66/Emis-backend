import express from 'express';
import cors from 'cors';
// src/routes/index.ts கோப்பை இறக்குமதி செய்ய
import router from './routes/index'; 

const app = express();

// CORS பிழை வராமல் இருக்க (Frontend-லிருந்து கோரிக்கைகளை ஏற்க)
app.use(cors());

// JSON தரவுகளைப் படிக்க
app.use(express.json());

// ரூட் பாதை - அனைத்து கோரிக்கைகளும் router-க்கு அனுப்பப்படும்
app.use('/', router); 

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
