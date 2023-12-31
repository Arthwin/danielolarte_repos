import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Organization from "./Organization";
import Repository from "./Repository";

// Define the class
class Tribe extends Model {
  public id_tribe!: number;
  public id_organization!: number;
  public name!: string;
  public status!: number;
  public repositories!: Repository[];
}

Tribe.init(
  {
    id_tribe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_organization: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "organization", // Refers to table name
        key: "id_organization", // Refers to column name in models table
      },
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
    modelName: "tribe",
    timestamps: false,
  }
);

// Define the association
Organization.hasMany(Tribe, { foreignKey: 'id_organization' });
Tribe.belongsTo(Organization, { foreignKey: 'id_organization' });

export default Tribe;
