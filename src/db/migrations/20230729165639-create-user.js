"use strict";
/** @type {import('sequelize-cli').Migration} */
const { SchemaUser } = require("../models/user");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", SchemaUser);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
