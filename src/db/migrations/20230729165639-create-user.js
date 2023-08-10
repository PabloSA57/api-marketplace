"use strict";
const { SchemaCustomer, CUSTOMER_TABLE } = require('../models/customer');
/** @type {import('sequelize-cli').Migration} */
const { SchemaUser, USER_TABLE } = require("../models/user");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, SchemaUser);
    await queryInterface.createTable(CUSTOMER_TABLE, SchemaCustomer);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
