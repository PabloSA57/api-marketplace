"use strict";

const { SchemaProductStore, PRODUCTSTORE_TABLE } = require("../models/productstore");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PRODUCTSTORE_TABLE, SchemaProductStore);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCTSTORE_TABLE);
  },
};
