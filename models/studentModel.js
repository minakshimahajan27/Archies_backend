// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     phone: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     course: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     batchTiming: {
//         type: String,
//         default: 'Morning'
//     },
//     totalFees: {
//         type: Number,
//         required: true
//     },
//     paidFees: {
//         type: Number,
//         default: 0
//     },
//     status: {
//         type: String,
//         enum: ['Active', 'Completed', 'Dropped'],
//         default: 'Active'
//     }
// }, {
//     timestamps: true
// });

// const Student = mongoose.model('Student', studentSchema);
// export default Student;

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    studentType: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Online' // <-- Yeh field add karna zaroori hai
    },
    totalFees: {
        type: Number,
        required: true
    },
    paidFees: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Dropped'],
        default: 'Active'
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
export default Student;