import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { generateRecommendations, getRecommendation } from "../controllers/recommendation.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recommendation
 *   description: Generate and fetch property recommendations
 */

/**
 * @swagger
 * /recommendation/{propertyId}:
 *   post:
 *     summary: Generate recommendations for a specific property
 *     tags: [Recommendation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the property to generate recommendations for
 *     responses:
 *       201:
 *         description: Recommendations generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: string
 *                 similarProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *                 generatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 */
router.post("/:propertyId", protect, generateRecommendations);

/**
 * @swagger
 * /recommendation/{propertyId}:
 *   get:
 *     summary: Get recommendations for a specific property
 *     tags: [Recommendation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the property to fetch recommendations for
 *     responses:
 *       200:
 *         description: List of recommended properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: string
 *                 similarProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *                 generatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recommendations not found
 */
router.get("/:propertyId", protect, getRecommendation);

export default router;
