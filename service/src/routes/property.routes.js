import express from "express"
import {
  PropertyCreate,
  deletePropertyById,
  getProperty,
  listAllProperties,
  updatePropertyById,
} from "../controllers/property.controller.js";

const router = express.Router();

router.post("/", PropertyCreate);            // Add Property
router.get("/", listAllProperties);          // List all with filters
router.get("/:id", getProperty);             // Get Single Property
router.put("/:id", updatePropertyById);      // Update A Property
router.delete("/:id", deletePropertyById);   // Delete A Property


export default router;
