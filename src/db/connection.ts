import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Database configuration
const databaseName = process.env.DB_DATABASE as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;

const db = new Sequelize(databaseName, username, password, {
  host,
  dialect: "postgres",
  define: {
    // Prevent Sequelize from pluralizing table names
    freezeTableName: true,
    // Don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  },
  // Other options like pool, logging, etc. can be added here if needed
});

export default db;
