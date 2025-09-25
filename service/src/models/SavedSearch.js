import mongoose from "mongoose";

const SavedSearchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  query: {
    type: Object,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["Daily", "Monthly", "Weekly"],
    default: "Daily",
  },
  lastModified: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedSearch = mongoose.model("SavedSearch", SavedSearchSchema);
export default SavedSearch;
