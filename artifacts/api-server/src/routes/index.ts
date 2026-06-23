import express from 'express';
import cors from 'cors';
// உங்கள் கோப்பு அமைப்பு src/routes/index.ts என்று இருப்பதால், இந்த பாதை சரியானது
import router from './routes/index'; 

const app = express();

// CORS பிழை வராமல் இருக்க
app.use(cors());

// JSON தரவுகளைப் படிக்க
app.use(express.json());

// ரூட் பாதை - அனைத்து கோரிக்கைகளும் router-க்கு அனுப்பப்படும்
app.use('/', router); 

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
