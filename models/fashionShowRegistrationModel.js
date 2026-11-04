import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'FashionShow', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    categoryName: { type: String, required: true },
    fee: { type: Number, required: true },
    transactionId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('FashionShowRegistration', registrationSchema);