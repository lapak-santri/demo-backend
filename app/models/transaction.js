'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
    }
  }
  Transaction.init(
    {
      id_user: DataTypes.INTEGER,
      transaction_code: DataTypes.STRING,
      invoice: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      district: DataTypes.STRING,
      village: DataTypes.STRING,
      gross_amount: DataTypes.INTEGER,
      token: DataTypes.TEXT,
      redirect_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
