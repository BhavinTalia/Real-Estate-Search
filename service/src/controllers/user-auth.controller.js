import * as UserService from "../services/user-auth.services.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    const token = generateToken(user);

    res
      .status(201)
      .json({ message: "User Created Successfully.", user, token });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "User profile fetched successfully",
      user: req.user, 
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await UserService.comparePassword(
      req.body.password,
      user.password
    );
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ message: "Logged In Successfully.", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  res.json({
    message: "Manage from client-side by removing token from cookies/storage.",
  });
};

export const listUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};
