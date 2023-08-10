'use strict';

  const { ORDER_TABLE, SchemaOrder } = require('../models/order');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.createTable(ORDER_TABLE, SchemaOrder);
  },
  down: async (queryInterface) =>  {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};