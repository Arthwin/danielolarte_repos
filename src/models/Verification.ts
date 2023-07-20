import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Repository from "./Repository";

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
        model: "repository", // refers to table name
        key: "id_repository", // refers to column name in models table
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

// Define the association between Repository and Metrics (1-to-many relationship)
Repository.hasOne(Verification, { foreignKey: "id" });
Verification.belongsTo(Repository, { foreignKey: "id_repository" });

export default Verification;
