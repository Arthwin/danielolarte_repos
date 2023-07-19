import { Sequelize } from "sequelize";

// Database configuration
const databaseName = "databaseName";
const username = "username";
const password = "password";
const host = "host";

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
