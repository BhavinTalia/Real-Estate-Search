import express from "express";
import cors from "cors";
import morgan from "morgan";
import propertyRoutes from "./routes/property.routes.js";
import userAuthRoutes from "./routes/user-auth.routes.js";
import savedSearchRoutes from "./routes/saved-search.routes.js";
import searchAnalyticsRoutes from "./routes/search-analytics.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./repositories/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "Real Estate Search API" }));

app.use("/api/user", userAuthRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/saved-search", savedSearchRoutes);
app.use("/api/search-analytics", searchAnalyticsRoutes);
app.use("/api/recommendation", recommendationRoutes);

export default app;
