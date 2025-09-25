import mongoose from "mongoose";

const SearchAnalyticsSchema = new mongoose.Schema({
  query: { type: String, required: true },
  filters: { type: Object },
  resultCount: { type: Number },
  searchedAt: { type: Date, default: Date.now },
});

const SearchAnalytics = mongoose.model(
  "SearchAnalytics",
  SearchAnalyticsSchema
);
export default SearchAnalytics;
