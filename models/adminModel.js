import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Admin schema definition
const adminSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please enter last name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter email'],
            unique: true, // Each admin must have a unique email
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            minlength: 6,
        },
        role: {
            type: String,
            default: 'admin', // By default, role is admin
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Pre-save middleware to hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to check if entered password matches hashed password
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create Admin model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
