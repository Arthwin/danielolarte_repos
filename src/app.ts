import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import lusca from "lusca";

const app = express();

// Express configuration
dotenv.config(); // Careful, must be done before some imports
app.set("port", process.env.PORT || 3000);

// Connect to DB
import db from "./db/connection";
(async () => {
  try {
    await db.authenticate();
    console.log("Database Online");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the application in case of database connection failure
  }
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Controllers
import orgController from "./routes/organizations";
import verificationController from "./routes/verification";
import metricsController from "./routes/metrics";

/**
 * Primary app routes.
 */

/**
 * API routes.
 */
app.use("/api/organizations", orgController);
app.use("/api/verification", verificationController);
app.use("/api/metrics", metricsController);

/**
 * Authentication routes.
 */

export default app;
