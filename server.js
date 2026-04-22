
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js'; 
import adminRoutes from './route/adminRoute.js';


dotenv.config();


connectDB();

const app = express();


app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});