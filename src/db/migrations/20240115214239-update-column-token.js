"use strict";

const { TOKEN_TABLE } = require("../models/token");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(TOKEN_TABLE, "access_token", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {},
};
