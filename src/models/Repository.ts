import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Tribe from "./Tribe";
import Metrics from "./Metrics";
import Verification from "./Verification";

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
        model: "tribe", // refers to table name
        key: "id_tribe", // refers to column name in models table
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    create_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR,
      allowNull: false,
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
