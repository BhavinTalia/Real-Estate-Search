import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  propertyType: {
    type: String,
    enum: ["House", "Apartment", "Land", "Commercial"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    length: Number,
    width: Number,
  },
  location: {
    HouseNo: String,
    landmark: String,
    city: String,
    state: String,
    country: String,
    co_ordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  amenities: [String],
  images: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Properties", PropertySchema);
export default Property;
