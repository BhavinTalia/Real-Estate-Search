import express from "express";
import {
  getAllSearches,
  recordSearch,
} from "../controllers/search-analytics.controller.js";
import { admin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, recordSearch);
router.get("/", protect, admin, getAllSearches);

export default router;
