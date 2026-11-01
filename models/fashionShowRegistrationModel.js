import mongoose from 'mongoose';

const fashionShowRegistrationSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    transactionId: { type: String, required: true },
    paymentScreenshot: { type: String, default: '' },
    passCode: { type: String, required: true, unique: true }, // Unique Pass Code
    status: { type: String, enum: ['Pending', 'Approved'], default: 'Approved' }
}, { timestamps: true });

const FashionShowRegistration = mongoose.model('FashionShowRegistration', fashionShowRegistrationSchema);
export default FashionShowRegistration;