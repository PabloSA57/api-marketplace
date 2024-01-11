"use strict";
const { INFOSEND_TABLE, SchemaInfoSend } = require("../models/infosend");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(INFOSEND_TABLE, SchemaInfoSend);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(INFOSEND_TABLE);
  },
};
