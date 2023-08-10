"use strict";

const { SchemaCategory, CATEGORY_TABLE } = require("../models/category");
const { SchemaProduct, PRODUCT_TABLE } = require("../models/product");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORY_TABLE, SchemaCategory);
    await queryInterface.createTable(PRODUCT_TABLE, SchemaProduct);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
