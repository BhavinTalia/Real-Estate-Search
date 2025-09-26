import SavedSearch from "../models/SavedSearch.js";

export const createSavedSearch = async (userId, data) => {
  const savedSearch = new SavedSearch({
    user: userId,
    query: data.query,
    frequency: data.frequency,
  });
  return await savedSearch.save();
};

export const getSavedSearches = async (userId) => {
  return await SavedSearch.find({ user: userId });
};

export const deleteSavedSearch = async (searchId, userId) => {
  return await SavedSearch.findOneAndDelete({ _id: searchId, user: userId });
};
