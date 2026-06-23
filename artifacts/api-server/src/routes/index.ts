import express from 'express';
import cors from 'cors';
import router from './routes/index'; // உங்கள் routes கோப்புறையில் உள்ள index.ts-ஐ இறக்குமதி செய்கிறது

const app = express();

// CORS பிழை வராமல் இருக்க
app.use(cors());

// JSON தரவுகளைப் படிக்க
app.use(express.json());

// முக்கியமான வரி: இங்கே '/' என்று கொடுத்தால், 
// உங்கள் routes/index.ts-இல் உள்ள பாதைகள் அப்படியே செயல்படும்.
app.use('/', router); 

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
