'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comments.belongsTo(models.locations, {foreignKey: 'id'})
      models.comments.belongsTo(models.users, {foreignKey: 'id'})    }
  };
  comments.init({
    userID: DataTypes.INTEGER,
    locationID: DataTypes.INTEGER,
    contents: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};