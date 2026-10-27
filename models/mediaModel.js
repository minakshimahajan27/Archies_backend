// import mongoose from 'mongoose';


// const mediaSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     category: { 
//         type: String, 
//         enum: ['Bridal', 'Party', 'Studio', 'Classes'], 
//         required: true 
//     },
//     mediaType: { 
//         type: String, 
//         enum: ['photo', 'video'], 
//         required: true 
//     },
//     videoUrl: { type: String }, 
//     file: { type: String },      
//     createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Media', mediaSchema);

import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Bridal', 'Party', 'Studio', 'Classes'], 
        required: true 
    },
    mediaType: { 
        type: String, 
        enum: ['photo', 'video'], 
        required: true 
    },
    videoUrl: { type: String }, 
    file: { type: String }, // 👈 Controller aur Model dono jagah same name 'file' hai
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Media', mediaSchema);