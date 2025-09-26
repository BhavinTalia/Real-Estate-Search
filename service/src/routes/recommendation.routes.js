import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { generateRecommendations, getRecommendation } from "../controllers/recommendation.controller.js";

const router = express.Router();

router.post("/:propertyId", protect, generateRecommendations);
router.get("/:propertyId", protect, getRecommendation);

export default router;
