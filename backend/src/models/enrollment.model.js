import { Schema, model } from "mongoose";

// enrollment schema
const enrollmentSchema = new Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    status: {
      type: String,
      enum: ["enrolled", "completed"],
      default: "enrolled",
    },
  },
  { timestamps: true }
);

const Enrollment = model("Enrollment", enrollmentSchema);

export default Enrollment;
