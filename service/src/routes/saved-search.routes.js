import express from "express";
import { createSavedSearch, deleteSavedSearch, getSavedSearches } from "../controllers/saved-search.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSavedSearch);
router.get("/", protect, getSavedSearches);
router.delete("/:id", protect, deleteSavedSearch);

export default router;
