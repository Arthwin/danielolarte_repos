import express from "express";
import cors from "cors";
import lusca from "lusca";

import db from "./db/connection";

// Controllers (route handlers)
import orgController from "./routes/organization";

// Create Express server
const app = express();

// Connect to DB
async function dbConnection() {
  try {
    await db.authenticate();
    console.log("Database Online");
  } catch (error: unknown) {
    console.log(
      `Database connection error. Please make sure the Database is running. ${
        error as string
      }`
    );
    // process.exit();
    // throw new Error(error as string);
  }
}
dbConnection();

// Express configuration
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */

/**
 * API routes.
 */
app.use("/api/organizations", orgController);

/**
 * Authentication routes. (Sign in)
 */

export default app;
