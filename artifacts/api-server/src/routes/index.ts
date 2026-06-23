import express from 'express';
import cors from 'cors';
// பாதையைச் சரியாகக் குறிப்பிட ./routes என மட்டும் கொடுத்தாலே போதும்
import router from './routes'; 

const app = express();

// CORS பிழை வராமல் இருக்க
app.use(cors());

// JSON தரவுகளைப் படிக்க
app.use(express.json());

// ரூட் பாதை
app.use('/', router); 

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
