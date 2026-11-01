import Course from '../models/courseModel.js';


// Add Course (Image upload ke sath)
export const addCourse = async (req, res) => {
  try {
    const { title, description, duration, price, rating, badge } = req.body;
    const image = req.file ? req.file.filename : '';

    const newCourse = await Course.create({
      title,
      description,
      duration,
      price,
      rating,
      badge,
      image
    });

    res.status(201).json({
      success: true,
      message: 'Course added successfully',
      data: newCourse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add course',
      error: error.message
    });
  }
};

// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update Course (Nayi image ke sath ya bina image ke)
export const updateCourse = async (req, res) => {
  try {
    const { title, description, duration, price, rating, badge } = req.body;
    
    let updateData = { title, description, duration, price, rating, badge };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    res.status(400).json({
      success: formatError(error),
      message: 'Failed to update course',
      error: error.message
    });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};