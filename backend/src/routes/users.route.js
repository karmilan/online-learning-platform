import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/users", verifyToken, authorizeRoles("admin"), createUser);
router.get("/users", verifyToken, authorizeRoles("admin"), getAllUsers);
router.put("/users/:id", verifyToken, authorizeRoles("admin"), updateUser);
router.delete("/users/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;
