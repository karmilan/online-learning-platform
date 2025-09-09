import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/courses.controller.js";

const router = express.Router();

router.post("/courses", createCourse);
router.get("/courses", getAllCourses);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

export default router;
