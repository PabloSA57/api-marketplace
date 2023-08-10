"use strict";
/** @type {import('sequelize-cli').Migration} */
const { SchemaStore, STORE_TABLE } = require("../models/store");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(STORE_TABLE, SchemaStore);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(STORE_TABLE);
  },
};
