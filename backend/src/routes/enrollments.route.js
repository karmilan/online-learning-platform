import express from "express";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  updateEnrollment,
} from "../controllers/enrollments.controller.js";

const router = express.Router();

router.post("/enrollments", createEnrollment);
router.get("/enrollments", getAllEnrollments);
router.put("/enrollments/:id", updateEnrollment);
router.delete("/enrollments/:id", deleteEnrollment);

export default router;
