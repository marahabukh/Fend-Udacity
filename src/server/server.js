import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.send('Travel App API Running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
