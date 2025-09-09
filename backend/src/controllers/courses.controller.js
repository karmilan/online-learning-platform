import Course from "../models/course.model.js";

// get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a new course
export const createCourse = async (req, res) => {
  const { title, description, duration } = req.body;

  const newCourse = new Course({
    title,
    description,
    duration,
  });

  try {
    const course = await newCourse.save();
    return res.status(201).json(course);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update a course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, duration },
      { new: true }
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
