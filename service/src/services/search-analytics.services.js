import SearchAnalytics from "../models/SearchAnalytics.js";

import elasticClient from "../utils/elasticClient.js";

export const recordSearch = async (data) => {
  const searchRecord = new SearchAnalytics({
    query: data.query,
    filters: data.filters,
    resultCount: data.resultCount,
  });
  await searchRecord.save();

  try {
    await elasticClient.index({
      index: "property_searches",
      body: {
        query: data.query,
        filters: data.filters,
        resultCount: data.resultCount,
        searchedAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Elasticsearch not available:", err.message);
  }

  return searchRecord;
};

export const getAllSearches = async () => {
  return await SearchAnalytics.find();
};
