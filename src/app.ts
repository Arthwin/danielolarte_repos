import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import lusca from "lusca";

// Create Express server
const app = express();

// Express configuration
dotenv.config();
app.set("port", process.env.PORT || 3000);

// Connect to DB
import db from "./db/connection";
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

// Middleware
app.use(cors());
app.use(express.json());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Controllers (route handlers)
import orgController from "./routes/organization";

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
