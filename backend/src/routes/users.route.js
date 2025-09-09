import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
