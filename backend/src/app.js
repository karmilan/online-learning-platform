import dotenv from 'dotenv';
import express from 'express';
import connectDB from './lib/db.js';

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Connect MongoDB
connectDB();

app.get('/', (req, res) => {
    res.json({ "msg": 'success' })
})



app.listen(PORT, () => {
    console.log(`The server is running at PORT:${PORT}`);
});