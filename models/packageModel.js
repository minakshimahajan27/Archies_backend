import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: [true, "Package name is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ['Bridal Makeup', 'Party Makeup', 'Hair Styling', 'Skin Care'] // Aap apni marzi se badal sakti hain
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    packageImage: {
        type: String, // Yahan image ka URL ya path save hoga
        // required: [true, "Package image is required"]
    }
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);
export default Package;