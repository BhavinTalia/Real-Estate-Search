import Property from "../models/Property.js";
import Recommendation from "../models/Recommendations.js";

// Simple similarity logic based on type/price range
export const generateRecommendations = async (propertyId) => {
  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  const similarProperties = await Property.find({
    propertyType: property.propertyType,
    price: { $gte: property.price * 0.8, $lte: property.price * 1.2 },
    _id: { $ne: propertyId },
  }).limit(5);

  const recommendation = await Recommendation.findOneAndUpdate(
    { property: propertyId },
    { similarProperties, generatedAt: new Date() },
    { upsert: true, new: true }
  );

  return recommendation;
};

export const getRecommendation = async (propertyId) => {
  return await Recommendation.findOne({ property: propertyId }).populate("similarProperties");
};
