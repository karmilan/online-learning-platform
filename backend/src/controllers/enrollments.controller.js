import Enrollment from "../models/enrollment.model.js";

// get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("user")
      .populate("course");
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get all enrollments by user id
export const getEnrollmentsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("enrollments", id);
    const enrollments = await Enrollment.find({ user: id })
      .populate("user")
      .populate("course");
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a new enrollment
export const createEnrollment = async (req, res) => {
  const { userId, courseId, status } = req.body;

  const newEnrollment = new Enrollment({
    user: userId,
    course: courseId,
    status,
  });

  try {
    const enrollment = await newEnrollment.save();
    return res.status(201).json(enrollment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update a enrollment
export const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const { userId, courseId, status } = req.body;

  const validStatuses = Enrollment.schema.path("status").enumValues;

  try {
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      { userId, courseId, status },
      { new: true }
    );

    if (!updatedEnrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    return res.status(200).json(updatedEnrollment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete a enrollment
export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);

    if (!deletedEnrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    return res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
