import * as searchAnalyticsService from "../services/search-analytics.services.js";

// Record a search
export const recordSearch = async (req, res) => {
  try {
    const record = await searchAnalyticsService.recordSearch(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List searches (admin)
export const getAllSearches = async (req, res) => {
  try {
    const searches = await searchAnalyticsService.getAllSearches();
    res.json(searches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
