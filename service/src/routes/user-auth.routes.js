import express from "express";
import { admin, protect } from "../middlewares/auth.middleware.js";
import {
  createUser,
  loginUser,
  logoutUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
} from "../controllers/user-auth.controller.js";

const router = express.Router();

// Public routes
router.post("/", createUser);        // Register
router.post("/login", loginUser);    // Login
router.post("/logout", logoutUser);  // Logout (optional, client-side)

// User protected routes
router.get("/me", protect, getProfile);

// Protected routes (admin only)
router.get("/", protect, admin, listUsers);          // List all users
router.get("/:id", protect, admin, getUser);         // Get user by ID
router.put("/:id", protect, admin, updateUser);      // Update user
router.delete("/:id", protect, admin, deleteUser);   // Delete user

export default router;
