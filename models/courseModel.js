import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required']
  },
  rating: {
    type: Number,
    default: 4.8
  },
  badge: {
    type: String,
    default: '' // Jaise "Best Seller"
  },
  image: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;