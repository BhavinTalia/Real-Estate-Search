import express from "express";
import { getAllSearches, recordSearch } from "../controllers/search-analytics.controller.js";
import { admin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SearchAnalytics
 *   description: Track and manage property search analytics
 */

/**
 * @swagger
 * /search-analytics:
 *   post:
 *     summary: Record a new property search
 *     tags: [SearchAnalytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *               - resultCount
 *             properties:
 *               query:
 *                 type: string
 *                 description: The search query string
 *               filters:
 *                 type: object
 *                 description: Optional search filters
 *               resultCount:
 *                 type: number
 *                 description: Number of results returned for this search
 *     responses:
 *       201:
 *         description: Search recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 query:
 *                   type: string
 *                 filters:
 *                   type: object
 *                 resultCount:
 *                   type: number
 *                 searchedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, recordSearch);

/**
 * @swagger
 * /search-analytics:
 *   get:
 *     summary: Get all search records (Admin only)
 *     tags: [SearchAnalytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all search records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   query:
 *                     type: string
 *                   filters:
 *                     type: object
 *                   resultCount:
 *                     type: number
 *                   searchedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 */
router.get("/", protect, admin, getAllSearches);

export default router;
