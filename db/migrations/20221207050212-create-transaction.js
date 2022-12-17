'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      transaction_code: {
        type: Sequelize.STRING,
      },
      invoice: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      district: {
        type: Sequelize.STRING,
      },
      village: {
        type: Sequelize.STRING,
      },
      gross_amount: {
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.TEXT,
      },
      redirect_url: {
        type: Sequelize.TEXT,
      },
      details: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
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
    await queryInterface.dropTable('Transactions');
  },
};
