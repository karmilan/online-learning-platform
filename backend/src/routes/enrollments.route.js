import express from "express";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  getEnrollmentsByUserId,
  updateEnrollment,
} from "../controllers/enrollments.controller.js";

const router = express.Router();

router.post("/enrollments", createEnrollment);
router.get("/enrollments", getAllEnrollments);
router.get("/enrollments/user/:id", getEnrollmentsByUserId);
router.put("/enrollments/:id", updateEnrollment);
router.delete("/enrollments/:id", deleteEnrollment);

export default router;
