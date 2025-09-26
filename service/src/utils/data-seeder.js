import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Property from "../models/Property.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/realestate", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Bob Brown",
    email: "bob@example.com",
    password: "password123",
    role: "user",
  },
];

const properties = [
  {
    title: "Luxurious 2BHK Condo",
    description: "Modern 2-bedroom condo with city views.",
    propertyType: "Apartment",
    price: 5500000,
    size: { length: 45, width: 35 },
    location: {
      HouseNo: "B-105",
      landmark: "Opposite Central Park",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      co_ordinates: [72.8777, 19.076],
    },
    amenities: [
      "Rooftop Terrace",
      "Gym",
      "Parking",
      "Swimming Pool",
      "Security Guard",
    ],
    images: [
      "https://example.com/images/property1.jpg",
      "https://example.com/images/property2.jpg",
    ],
  },
  {
    title: "Cozy 1BHK Apartment",
    description: "Small cozy apartment in the heart of the city.",
    propertyType: "Apartment",
    price: 2500000,
    size: { length: 25, width: 20 },
    location: {
      HouseNo: "A-201",
      landmark: "Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      co_ordinates: [72.877, 19.075],
    },
    amenities: ["Parking", "Lift", "24/7 Security"],
    images: ["https://example.com/images/property3.jpg"],
  },
  {
    title: "Spacious 3BHK Villa",
    description: "Luxury villa with private garden and swimming pool.",
    propertyType: "House",
    price: 12000000,
    size: { length: 60, width: 50 },
    location: {
      HouseNo: "C-303",
      landmark: "Near River Park",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      co_ordinates: [73.8567, 18.5204],
    },
    amenities: ["Garden", "Swimming Pool", "Garage", "Security Guard"],
    images: [
      "https://example.com/images/property4.jpg",
      "https://example.com/images/property5.jpg",
    ],
  },
  {
    title: "Commercial Shop Space",
    description: "Shop space in prime market area, suitable for retail.",
    propertyType: "Commercial",
    price: 8000000,
    size: { length: 40, width: 30 },
    location: {
      HouseNo: "D-501",
      landmark: "Main Market Street",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      co_ordinates: [77.5946, 12.9716],
    },
    amenities: ["Parking", "CCTV", "Lift"],
    images: ["https://example.com/images/property6.jpg"],
  },
  {
    title: "Open Land Plot",
    description: "5000 sq.ft. land available for residential construction.",
    propertyType: "Land",
    price: 3000000,
    size: { length: 100, width: 50 },
    location: {
      HouseNo: "",
      landmark: "Near Highway",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      co_ordinates: [80.2707, 13.0827],
    },
    amenities: [],
    images: [],
  },
];

const seedDB = async () => {
  try {
    // Clear DB
    await mongoose.connection.dropDatabase();
    console.log("Database Cleared");

    // Hash passwords
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert users
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log("Users Seeded");

    // Assign postedBy: pick a random user for each property
    const propertiesWithPostedBy = properties.map((prop, index) => ({
      ...prop,
      postedBy: createdUsers[index % createdUsers.length]._id,
    }));

    // Insert properties
    await Property.insertMany(propertiesWithPostedBy);
    console.log("Properties Seeded");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Immediately-invoked async function
(async () => {
  await connectDB(); // await before seeding
  await seedDB();
})();
