

import express from 'express';
import { loginAdmin, registerAdmin } from '../controller/adminController.js';
import { addPackage, getAllPackages, updatePackage, deletePackage } from '../controller/packageController.js';
import { addMedia, getAllMedia, deleteMedia, updateMedia } from '../controller/mediaController.js';
import { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controller/studentController.js';
import { addReview, getAllReviews, updateReview, deleteReview } from '../controller/reviewController.js';
import { addCourse, getAllCourses, updateCourse, deleteCourse } from '../controller/courseController.js';

import {
    createFashionShow,
    getAllFashionShows,
    updateFashionShow,
    deleteFashionShow,
    registerForFashionShow,
    getAllRegistrations
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



// FASHION SHOW ROUTES
router.post('/fashionshow/create', upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'qrCode', maxCount: 1 }]), createFashionShow);
router.get('/fashionshow/all', getAllFashionShows);
router.put('/fashionshow/update/:id', upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'qrCode', maxCount: 1 }]), updateFashionShow); 
router.delete('/fashionshow/delete/:id', deleteFashionShow);

router.post('/fashionshow/register', registerForFashionShow);
router.get('/fashionshow/registrationall', getAllRegistrations);




export default router;