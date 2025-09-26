import SavedSearch from "../models/SavedSearch.js";
import User from "../models/User.js";

export const createSavedSearch = async (userId, data) => {
  const savedSearch = new SavedSearch({
    user: userId,
    query: data.query,
    frequency: data.frequency,
  });
  const newSearch = await savedSearch.save();

  await User.findByIdAndUpdate(
    userId,
    { $push: { savedSearches: newSearch._id } },
    { new: true }
  );

  return newSearch;
};

export const getSavedSearches = async (userId) => {
  return await SavedSearch.find({ user: userId });
};

export const deleteSavedSearch = async (searchId, userId) => {
  const deletedSearch = await SavedSearch.findOneAndDelete({
    _id: searchId,
    user: userId,
  });

  if (!deletedSearch) {
    throw new Error("Saved search not found or not authorized to delete");
  }

  await User.findByIdAndUpdate(
    userId,
    { $pull: { savedSearches: searchId } },
    { new: true }
  );

  return deletedSearch;
};
