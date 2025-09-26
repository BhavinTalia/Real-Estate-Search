import express from "express"
import {
  PropertyCreate,
  deletePropertyById,
  getProperty,
  listAllProperties,
  updatePropertyById,
} from "../controllers/property.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect ,PropertyCreate);   // Add Property
router.get("/", listAllProperties);          // List all with filters
router.get("/:id", getProperty);             // Get Single Property
router.put("/:id", updatePropertyById);      // Update A Property
router.delete("/:id", deletePropertyById);   // Delete A Property


export default router;
