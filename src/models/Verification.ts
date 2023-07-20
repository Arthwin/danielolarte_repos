import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Repository from "./Repository";

// Define the class
class Verification extends Model {
  public id!: number;
  public state!: number;
}

Verification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "repository", // Rfers to table name
        key: "id_repository", // Refers to column name in models table
      },
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "verification",
    timestamps: false,
  }
);

// Define the association
Repository.hasOne(Verification, { foreignKey: "id" });
Verification.belongsTo(Repository, { foreignKey: "id_repository" });

export default Verification;
