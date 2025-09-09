import { Schema, model } from "mongoose";

// course schema
const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

export default Course;
