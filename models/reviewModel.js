import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    serviceUsed: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    },
    clientPhoto: {
        type: String, // Upload ki gayi image ka file path store karne ke liye
        default: ''
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;