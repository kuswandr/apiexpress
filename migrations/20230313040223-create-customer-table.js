'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
       id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
       },
       name: {
        type: DataTypes.STRING,
        allowNull: false
       },
       email: {
        type: DataTypes.STRING,
        allowNull: true
       },
       createdAt: {
        type: DataTypes.DATE,
        allowNull: false
       },
       updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
       }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
