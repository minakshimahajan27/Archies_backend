// import Admin from '../models/adminModel.js';
// import jwt from 'jsonwebtoken';

// // Function to generate JWT token
// const generateToken = (id) => {
//     return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, {
//         expiresIn: '1d',
//     });
// };

// // Admin Registration
// export const registerAdmin = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;

//         // Check if admin already exists
//         const adminExists = await Admin.findOne({ email });

//         if (adminExists) {
//             return res.status(400).json({ message: 'Admin already exists' });
//         }

//         // Create new admin
//         const admin = await Admin.create({
//             firstName,
//             lastName,
//             email,
//             password,
//         });

//         if (admin) {
//             res.status(201).json({
//                 _id: admin._id,
//                 firstName: admin.firstName,
//                 lastName: admin.lastName,
//                 email: admin.email,
//                 role: admin.role,
//                 token: generateToken(admin._id),
//             });
//         } else {
//             res.status(400).json({ message: 'Invalid admin data' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Admin Login
// // export const loginAdmin = async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         // Find admin by email
// //         const admin = await Admin.findOne({ email });

// //         // Check if admin exists and password is correct
// //         if (admin && (await admin.matchPassword(password))) {
// //             res.json({
// //                 _id: admin._id,
// //                 firstName: admin.firstName,
// //                 lastName: admin.lastName,
// //                 email: admin.email,
// //                 role: admin.role,
// //                 token: generateToken(admin._id),
// //             });
// //         } else {
// //             res.status(401).json({ message: 'Invalid email or password' });
// //         }
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server error', error: error.message });
// //     }
// // };
// export const loginAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // 1. Check if admin exists
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(401).json({ success: false, message: "Email nahi mila!" });
//         }

//         // 2. Check password (Model ka method use karein)
//         const isMatch = await admin.matchPassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: "Password galat hai!" });
//         }

//         // 3. Token Generate karein
//         const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.json({ success: true, token });

//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


import Admin from '../models/adminModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Admin Registration
export const registerAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Password ko encrypt karke save karein
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                role: admin.role,
                token: generateToken(admin._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Admin Login (Dono bcrypt aur plain text match support karega)
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, message: "Email nahi mila!" });
        }

        // 2. Check password (Dono options handle karega: Hashed ya Plain text)
        let isMatch = false;
        
        // Pehle model ka matchPassword method ya bcrypt check karein
        if (typeof admin.matchPassword === 'function') {
            isMatch = await admin.matchPassword(password);
        } else {
            isMatch = await bcrypt.compare(password, admin.password);
        }

        // Agar bcrypt se match na ho, toh plain text check kar lo (agar database me plain text ho)
        if (!isMatch && admin.password === password) {
            isMatch = true;
        }

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Password galat hai!" });
        }

        // 3. Token Generate karein
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ 
            success: true, 
            token,
            admin: {
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};