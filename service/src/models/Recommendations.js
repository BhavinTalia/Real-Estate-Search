import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Properties" },
  similarProperties: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Properties" },
  ],
  generatedAt: { type: Date, default: Date.now },
});

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);
export default Recommendation;
