import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/courses.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/courses", verifyToken, authorizeRoles("admin"), createCourse);
router.get("/courses", verifyToken, getAllCourses);
router.put("/courses/:id", verifyToken, authorizeRoles("admin"), updateCourse);
router.delete(
  "/courses/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteCourse
);

export default router;
