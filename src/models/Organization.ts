import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

class Organization extends Model {}

Organization.init(
  {
    id_organization: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "organization",
    timestamps: false,
  }
);

export default Organization;
