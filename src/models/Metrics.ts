import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../db/connection";
import Repository from "./Repository";

// Define the class
class Metrics extends Model {
  public id_repository!: number;
  public coverage!: number;
  public bugs!: number;
  public vulnerabilities!: number;
  public hotspot!: number;
  public code_smells!: number;
}

Metrics.init(
  {
    id_repository: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "repository", // Refers to table name
        key: "id_repository", // Refers to column name in models table
      },
    },
    coverage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bugs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vulnerabilities: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotspot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_smells: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db as Sequelize,
    modelName: "metrics",
    timestamps: false,
  }
);

// Define the association
Repository.hasOne(Metrics, { foreignKey: "id_repository" });
Metrics.belongsTo(Repository, { foreignKey: "id_repository" });

export default Metrics;
