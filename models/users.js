'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.belongsTo(models.roles, {foreignKey: 'roleName'})
      models.users.hasMany(models.comments, {foreignKey: 'userID'})    }
  };
  users.init({
    roleName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    introvertRating: DataTypes.INTEGER,
    homeCity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};