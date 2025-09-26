import express from "express";
import { createSavedSearch, deleteSavedSearch, getSavedSearches } from "../controllers/saved-search.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SavedSearch
 *   description: Manage saved searches
 */

/**
 * @swagger
 * /saved-search:
 *   post:
 *     summary: Create a saved search
 *     tags: [SavedSearch]
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
 *             properties:
 *               query:
 *                 type: object
 *                 description: Search query object
 *               frequency:
 *                 type: string
 *                 description: Frequency of saved search notifications
 *                 enum: [Daily, Weekly, Monthly]
 *     responses:
 *       201:
 *         description: Saved search created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 query:
 *                   type: object
 *                 frequency:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createSavedSearch);

/**
 * @swagger
 * /saved-search:
 *   get:
 *     summary: Get all saved searches for logged-in user
 *     tags: [SavedSearch]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved searches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   query:
 *                     type: object
 *                   frequency:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getSavedSearches);

/**
 * @swagger
 * /saved-search/{id}:
 *   delete:
 *     summary: Delete a saved search by ID
 *     tags: [SavedSearch]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Saved search ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Saved search not found
 */
router.delete("/:id", protect, deleteSavedSearch);

export default router;
