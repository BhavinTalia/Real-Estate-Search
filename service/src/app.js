import express from "express";
import cors from "cors";
import morgan from "morgan";
// import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ message: "Real Estate Search API" }));

// app.use("/api/properties", propertyRoutes);

export default app;
