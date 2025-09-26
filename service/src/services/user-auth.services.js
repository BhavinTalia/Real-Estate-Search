import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashedPassword });
  return user.save();
};

export const getAllUsers = async () => {
  return User.find().select("-password");
};

export const getUserById = async (id) => {
  return User.findById(id).select("-password");
};

export const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

export const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const comparePassword = async (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);
