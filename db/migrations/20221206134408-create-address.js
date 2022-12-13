'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      village: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      detail_address: {
        type: Sequelize.TEXT,
      },
      recipient: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  },
};
