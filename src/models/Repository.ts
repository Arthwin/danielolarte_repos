import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

class Repository extends Model {}

Repository.init(
  {
    id_repository: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tribe: {
      type: DataTypes.INTEGER,
      references: {
        model: "tribe", // refers to table name
        key: "id_tribe", // refers to column name in models table
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.CHAR,
    },
    create_time: {
      type: DataTypes.TIME,
    },
    status: {
      type: DataTypes.CHAR,
    },
  },
  {
    sequelize: db,
    modelName: "repository",
    timestamps: false,
  }
);

export default Repository;
