
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { loginAdmin, registerAdmin } from '../controller/adminController.js';
// import { addPackage, getAllPackages, updatePackage, deletePackage } from '../controller/packageController.js';
// import { addMedia, getAllMedia, deleteMedia, updateMedia } from '../controller/mediaController.js';
// const upload = require('../middleware/upload.js');

// const router = express.Router();

// // --- MULTER SETUP START ---
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit tak videos allow karne ke liye
// });
// // --- MULTER SETUP END ---

// // --- ADMIN ROUTES ---
// router.post('/register', registerAdmin);
// router.post('/login', loginAdmin);

// // --- PACKAGE ROUTES ---

// router.post('/packages/add', upload.single('packageImage'), addPackage); // Path badal diya
// router.get('/packages/all', getAllPackages);
// router.put('/packages/update/:id', upload.single('packageImage'), updatePackage);
// router.delete('/packages/delete/:id', deletePackage);

// // --- PHOTOS & VIDEOS ROUTES ---
// // router.post('/media/add', upload.single('file'), addMedia); // Path badal diya
// // router.get('/media/all', getAllMedia);
// // // Agar image bhej rahe ho ya ho sakta hai user bhej de:
// // router.put('/media/update/:id', upload.single('file'), updateMedia);

// // router.delete('/media/delete/:id', deleteMedia);

// router.post('/media/add', upload.single('file'), addMedia);
// router.put('/media/update/:id', upload.single('file'), updateMedia);
// router.get('/media/all', getAllMedia);
// router.delete('/media/delete/:id', deleteMedia);

// export default router;

// import express from 'express';
// import { loginAdmin, registerAdmin } from '../controller/adminController.js';
// import { addPackage, getAllPackages, updatePackage, deletePackage } from '../controller/packageController.js';
// import { addMedia, getAllMedia, deleteMedia, updateMedia } from '../controller/mediaController.js';
// import { addStudent, getAllStudents,  getStudentById, updateStudent, deleteStudent } from '../controller/studentController.js';
// import upload from '../middleware/upload.js'; // <-- Yeh sahi ES6 import hai

// const router = express.Router();

// // --- ADMIN ROUTES ---
// router.post('/register', registerAdmin);
// router.post('/login', loginAdmin);

// // --- PACKAGE ROUTES ---
// router.post('/packages/add', upload.single('packageImage'), addPackage);
// router.get('/packages/all', getAllPackages);
// router.put('/packages/update/:id', upload.single('packageImage'), updatePackage);
// router.delete('/packages/delete/:id', deletePackage);

// // --- PHOTOS & VIDEOS ROUTES ---
// router.post('/media/add', upload.single('file'), addMedia);
// router.put('/media/update/:id', upload.single('file'), updateMedia);
// router.get('/media/all', getAllMedia);
// router.delete('/media/delete/:id', deleteMedia);

// //student Route.........................
// router.post('/student/add', addStudent);
// router.get('/student/getall', getAllStudents);
// router.get('/student/get/:id', getStudentById);
// router.put('/student/update/:id', updateStudent);
// router.delete('/student/delete/:id', deleteStudent);

// export default router;

import express from 'express';
import { loginAdmin, registerAdmin } from '../controller/adminController.js';
import { addPackage, getAllPackages, updatePackage, deletePackage } from '../controller/packageController.js';
import { addMedia, getAllMedia, deleteMedia, updateMedia } from '../controller/mediaController.js';
import { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controller/studentController.js';
import { addReview, getAllReviews, updateReview, deleteReview } from '../controller/reviewController.js';
import { addCourse, getAllCourses, updateCourse, deleteCourse } from '../controller/courseController.js';
import { 
    getActiveFashionShow, 
    updateFashionShowDetails, 
    registerForFashionShow, 
    getAllFashionShowRegistrations, 
    deleteFashionShowRegistration 
} from '../controller/fashionShowController.js';
import upload from '../middleware/upload.js';
const router = express.Router();

// --- ADMIN ROUTES ---
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// --- PACKAGE ROUTES ---
router.post('/packages/add', upload.single('packageImage'), addPackage);
router.get('/packages/all', getAllPackages);
router.put('/packages/update/:id', upload.single('packageImage'), updatePackage);
router.delete('/packages/delete/:id', deletePackage);

// --- PHOTOS & VIDEOS ROUTES ---
router.post('/media/add', upload.single('file'), addMedia);
router.put('/media/update/:id', upload.single('file'), updateMedia);
router.get('/media/all', getAllMedia);
router.delete('/media/delete/:id', deleteMedia);

// --- STUDENT ROUTES ---
// Sahi Route Setup with Multer
router.post('/student/add', upload.single('file'), addStudent);
router.get('/student/getall', getAllStudents);
router.get('/student/get/:id', getStudentById);
router.put('/student/update/:id', updateStudent);
router.delete('/student/delete/:id', deleteStudent);

//Review
router.post('/reviews/add', upload.single('file'), addReview);
router.get('/reviews/all', getAllReviews);
router.put('/reviews/update/:id', upload.single('file'), updateReview); // <-- Yeh update ka route hai
router.delete('/reviews/delete/:id', deleteReview);

//class
router.post('/courses/add', upload.single('file'), addCourse);
router.get('/courses/all', getAllCourses);
router.put('/courses/update/:id', upload.single('file'), updateCourse); // <-- Yeh update ka route hai
router.delete('/courses/delete/:id', deleteCourse);

//fashion
router.get('/fashion-show/active', getActiveFashionShow);
router.post('/fashion-show/update', upload.single('file'), updateFashionShowDetails);
router.post('/fashion-show/register', upload.single('file'), registerForFashionShow);
router.get('/fashion-show/registrations', getAllFashionShowRegistrations);
router.delete('/fashion-show/registration/delete/:id', deleteFashionShowRegistration);

export default router;