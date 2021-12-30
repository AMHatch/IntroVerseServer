'use strict';
import {Model} from 'sequelize';

interface CommentsAttributes {
  id: number;
  userID: number;
  locationID: number;
  contents: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class comments extends Model<CommentsAttributes> 
  implements CommentsAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    userID!: number;
    locationID!: number;
    contents!: string;
    static associate(models: any) {
      models.comments.belongsTo(models.locations, {foreignKey: 'id'})
      models.comments.belongsTo(models.users, {foreignKey: 'id'})
    }
  };
  comments.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    locationID: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    contents: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};