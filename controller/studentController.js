// import Student from '../models/studentModel.js';

// export const addStudent = async (req, res) => {
//     try {
//         const newStudent = new Student(req.body);
//         const savedStudent = await newStudent.save();
//         res.status(201).json({
//             success: true,
//             message: 'Student added successfully to academy',
//             data: savedStudent
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// export const getAllStudents = async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.status(200).json({
//             success: true,
//             count: students.length,
//             data: students
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// export const getStudentById = async (req, res) => {
//     try {
//         const student = await Student.findById(req.params.id);
//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Student not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: student
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// export const updateStudent = async (req, res) => {
//     try {
//         const updatedStudent = await Student.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedStudent) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Student not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Student details updated successfully',
//             data: updatedStudent
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// export const deleteStudent = async (req, res) => {
//     try {
//         const deletedStudent = await Student.findByIdAndDelete(req.params.id);
//         if (!deletedStudent) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Student not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Student deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

import Student from '../models/studentModel.js';

// export const addStudent = async (req, res) => {
//     try {
//         const newStudent = new Student(req.body);
//         const savedStudent = await newStudent.save();
//         res.status(201).json({
//             success: true,
//             message: 'Student added successfully to academy',
//             data: savedStudent
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

export const addStudent = async (req, res) => {
    try {
        console.log("Student Body:", req.body);
        console.log("Uploaded File:", req.file);

        const newStudent = new Student({
            ...req.body,

            // Save uploaded image filename
            photo: req.file ? req.file.filename : ''
        });

        const savedStudent = await newStudent.save();

        res.status(201).json({
            success: true,
            message: 'Student added successfully to academy',
            data: savedStudent
        });

    } catch (error) {
        console.error("Add Student Error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'This email is already registered!'
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student details updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};