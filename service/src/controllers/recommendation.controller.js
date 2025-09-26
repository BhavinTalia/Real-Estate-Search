import recommendationService from "../services/recommendation.services.js"

export const generateRecommendations = async (req, res) => {
  try {
    const recommendations = await recommendationService.generateRecommendations(req.params.propertyId);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecommendation = async (req, res) => {
  try {
    const rec = await recommendationService.getRecommendation(req.params.propertyId);
    res.json(rec);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
