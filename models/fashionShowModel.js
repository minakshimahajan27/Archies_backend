import mongoose from 'mongoose';

const fashionShowSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    venue: { type: String, required: true },
    categories: [
        {
            categoryName: { type: String, required: true },
            fee: { type: Number, required: true }
        }
    ],
    banner: { type: String, required: true }, // Image URL
    qrCode: { type: String, required: true }   // QR Code Image URL
}, { timestamps: true });

export default mongoose.model('FashionShow', fashionShowSchema);