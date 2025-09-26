import Property from "../models/Property.js";
// import elasticClient from "../utils/elasticClient.js";

// const INDEX = "properties";

export const createProperty = async (data) => {
  const property = await Property.create(data);
  // await elasticClient.index({
  //   index: INDEX,
  //   id: property._id.toString(),
  //   body: {
  //     title: property.title,
  //     description: property.description,
  //     propertyType: property.propertyType,
  //     price: property.price,
  //     size: property.size,
  //     location: property.location,
  //     amenities: property.amenities,
  //     postedBy: property.postedBy,
  //     createdAt: property.createdAt,
  //   },
  // });
  return property;
};

export const getPropertyById = async (id) => {
  return Property.findById(id);
};

export const updateProperty = async (id, data) => {
  const updated = await Property.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

export const deleteProperty = async (id) => {
  const deleted = await Property.findByIdAndDelete(id);
  return deleted;
};

export const listProperties = async (filters = {}, options = {}) => {
  const { limit = 20, skip = 0, sort = { createdAt: -1 } } = options;
  const query = Property.find(filters)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate("postedBy", "name email role");
  const properties = await query.exec();
  return properties;
};
