
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/connectDB.js'; 
// import adminRoutes from './route/adminRoute.js';
// import packageRoutes from './route/adminRoute.js';
// import mediaRoutes from './route/adminRoute.js';
// import studentRoutes from './route/studentRoute.js';

// dotenv.config();


// connectDB();

// const app = express();

// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb', extended: true }));
// app.use(cors()); 
// app.use(express.json()); 
// app.use('/uploads', express.static('uploads')); // 'uploads' aapke folder ka naam hai


// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// app.use('/api/admin', adminRoutes);
// app.use('/api/admin', packageRoutes);
// app.use('/api/admin', mediaRoutes);
// app.use('/api/admin', studentRoutes);

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//     console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js'; 
import adminRoutes from './route/adminRoute.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors()); 
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Saare routes (Admin, Packages, Media, Students) adminRoute.js ke through yahan mount honge
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});