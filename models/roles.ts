'use strict';
import  {Model} from 'sequelize';

interface RolesAttributes {
  id: number;
  roleName: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class roles extends Model<RolesAttributes> 
  implements RolesAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    roleName!: string;
    static associate(models: any) {
      models.roles.hasMany(models.users, {foreignKey: 'roleName'})
    }
  };
  roles.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};