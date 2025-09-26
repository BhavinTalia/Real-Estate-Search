import * as savedSearchService from "../services/saved-search.services.js";

// Create a saved search
export const createSavedSearch = async (req, res) => {
  try {
    const savedSearch = await savedSearchService.createSavedSearch(req.user._id, req.body);
    res.status(201).json(savedSearch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all saved searches for user
export const getSavedSearches = async (req, res) => {
  try {
    const searches = await savedSearchService.getSavedSearches(req.user.id);
    res.json(searches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete saved search
export const deleteSavedSearch = async (req, res) => {
  try {
    await savedSearchService.deleteSavedSearch(req.params.id, req.user.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
