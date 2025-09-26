import {
  createProperty,
  deleteProperty,
  getPropertyById,
  listProperties,
  updateProperty,
} from "../services/property.services.js";

export const PropertyCreate = async (req, res) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json({
      message: "Property Created Successfully.",
      property,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Failed to Create Property.",
      error: error.message,
    });
  }
};

export const getProperty = async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch property", error: err.message });
  }
};

export const updatePropertyById = async (req, res) => {
  try {
    const updated = await updateProperty(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property Updated Successfully.", property: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update property", error: err.message });
  }
};

export const deletePropertyById = async (req, res) => {
  try {
    const deleted = await deleteProperty(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property Deleted Successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete property", error: err.message });
  }
};

export const listAllProperties = async (req, res) => {
  try {
    const filters = {};
    const {
      title,
      description,
      propertyType,
      minPrice,
      maxPrice,
      minLength,
      maxLength,
      minWidth,
      maxWidth,
      houseNo,
      landmark,
      city,
      state,
      country,
      amenities,
      postedBy
    } = req.query;

    if (title) filters.title = { $regex: title, $options: "i" };
    if (description) filters.description = { $regex: description, $options: "i" };
    if (propertyType) filters.propertyType = propertyType;

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    if (minLength || maxLength || minWidth || maxWidth) {
      filters.size = {};
      if (minLength) filters.size.length = { ...filters.size.length, $gte: Number(minLength) };
      if (maxLength) filters.size.length = { ...filters.size.length, $lte: Number(maxLength) };
      if (minWidth) filters.size.width = { ...filters.size.width, $gte: Number(minWidth) };
      if (maxWidth) filters.size.width = { ...filters.size.width, $lte: Number(maxWidth) };
    }

    if (houseNo) filters["location.HouseNo"] = { $regex: houseNo, $options: "i" };
    if (landmark) filters["location.landmark"] = { $regex: landmark, $options: "i" };
    if (city) filters["location.city"] = { $regex: city, $options: "i" };
    if (state) filters["location.state"] = { $regex: state, $options: "i" };
    if (country) filters["location.country"] = { $regex: country, $options: "i" };

    if (amenities) {
      const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(",");
      filters.amenities = { $all: amenitiesArray };
    }

    if (postedBy) filters.postedBy = postedBy;

    const properties = await listProperties(filters);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties", error: err.message });
  }
};

