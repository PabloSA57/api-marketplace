'use strict';

const { ORDERPRODUCTS_TABLE, SchemaOrderProduct } = require('../models/orderproducts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.createTable(ORDERPRODUCTS_TABLE, SchemaOrderProduct);
  },
  down: async (queryInterface) =>  {
    await queryInterface.dropTable(ORDERPRODUCTS_TABLE);
  }
};
