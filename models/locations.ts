'use strict';
import {Model} from 'sequelize';

export interface LocationsAttributes {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class locations extends Model<LocationsAttributes> 
  implements LocationsAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;
     name!: string;
     latitude!: number;
     longitude!: number;
    static associate(models: any) {
      models.locations.hasMany(models.comments, {foreignKey: 'locationID'})    }
  };
  locations.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    latitude: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'locations',
  });
  return locations;
};