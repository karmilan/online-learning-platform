import { Schema, model } from "mongoose";

// enrollment schema
const enrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
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
