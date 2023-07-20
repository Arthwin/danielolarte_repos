import { DataTypes, Model, ValidationError } from "sequelize";
import db from "../db/connection";
import Tribe from "./Tribe";
import Metrics from "./Metrics";
import Verification from "./Verification";

// Define the class
class Repository extends Model {
  public id_repository!: number;
  public id_tribe!: number;
  public name!: string;
  public state!: string;
  public create_time!: Date;
  public status!: string;
  public metric!: Metrics;
  public verification!: Verification;
}

Repository.init(
  {
    id_repository: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_tribe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tribe", // Refers to table name
        key: "id_tribe", // Refers to column name in models table
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    state: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        isValidState(value: string): void {
          if (!['E', 'D', 'A'].includes(value)) {
            throw new Error("Invalid state");
          }
        },
      },
    },
    create_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        isValidState(value: string): void {
          if (!['A', 'I'].includes(value)) {
            throw new Error("Invalid status");
          }
        },
      },
    },
  },
  {
    sequelize: db,
    modelName: "repository",
    timestamps: false,
  }
);

// Define the association
Tribe.hasMany(Repository, { foreignKey: "id_tribe" });
Repository.belongsTo(Tribe, { foreignKey: "id_tribe" });

export default Repository;
