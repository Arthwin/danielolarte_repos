import express from "express";

// Controllers (route handlers)

// Create Express server
const app = express();

// Connect to DB

// Express configuration
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.json());

/**
 * Primary app routes.
 */

/**
 * API routes.
 */

/**
 * Authentication routes. (Sign in)
 */

export default app;
