import { Sequelize } from "sequelize";
import * as config from "../config/dbConfig"

// Database configuration
const name = config.dbName;
const username = config.dbUsername;
const password = config.dbPassword;
const host = config.dbHost;
const connectionString = config.dbConnectionString;

// ORM

const db = new Sequelize(connectionString,{
  host,
  dialect: "postgres",
  define: {
    // Prevent Sequelize from pluralizing table names
    freezeTableName: true,
    // Don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  },
});
/*const db = new Sequelize(name, username, password, {
  host,
  dialect: "postgres",
  define: {
    // Prevent Sequelize from pluralizing table names
    freezeTableName: true,
    // Don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  },
});*/

export default db;


