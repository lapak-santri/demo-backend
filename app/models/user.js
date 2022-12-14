const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'id_user',
      });
      User.hasMany(models.Cart, {
        foreignKey: 'id_user',
      });
      User.hasMany(models.Address, {
        foreignKey: 'id_user',
      });
      User.hasMany(models.Transaction, {
        foreignKey: 'id_user',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email already used',
        },
      },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      image: DataTypes.ARRAY(DataTypes.TEXT),
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
