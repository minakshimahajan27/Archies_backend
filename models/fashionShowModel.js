import mongoose from 'mongoose';

const fashionShowSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String, required: true },
    venue: { type: String, required: true },
    registrationFee: { type: Number, required: true },
    qrCodeImage: { type: String, required: true }, // QR Code Image Path
    isActive: { type: Boolean, default: true } // Active/Inactive toggle
}, { timestamps: true });

const FashionShow = mongoose.model('FashionShow', fashionShowSchema);
export default FashionShow;