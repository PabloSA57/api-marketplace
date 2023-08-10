'use strict';
const { TOKEN_TABLE, SchemaToken } = require('../models/token');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(TOKEN_TABLE, SchemaToken );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TOKEN_TABLE);
  }
};