import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Repository from "./Repository";

// Define the class
class Organization extends Model {
  public id_organization!: number;
  public name!: string;
  public status!: number;
  public repositories!: Repository[];
}

Organization.init(
  {
    id_organization: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "organization",
    timestamps: false,
  }
);

export default Organization;
