'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
    }
  }
  Address.init(
    {
      id_user: DataTypes.INTEGER,
      village: DataTypes.STRING,
      district: DataTypes.STRING,
      detail_address: DataTypes.TEXT,
      recipient: DataTypes.STRING,
      phone: DataTypes.STRING,
      area: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};
