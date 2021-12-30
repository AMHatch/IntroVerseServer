'use strict';
import {Model} from 'sequelize';

interface UserAttributes {
  id: number;
  roleName: string;
  email: string;
  password: string;
  introvertRating: number;
  homeCity: string;
  state: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class users extends Model<UserAttributes> 
  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    roleName!: string;
    email!: string;
    password!: string;
    introvertRating!: number;
    homeCity!: string;
    state!: string;
    static associate(models: any) {
      models.users.belongsTo(models.roles, {foreignKey: 'roleName'})
      models.users.hasMany(models.comments, {foreignKey: 'userID'})    }
  };
  users.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    introvertRating: {
      type: DataTypes.INTEGER,
    },
    homeCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};