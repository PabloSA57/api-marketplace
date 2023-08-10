'use strict';
const { CATEGORY_TABLE } = require('./../models/category')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(CATEGORY_TABLE, [{
      name: 'Frutas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Verduras',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bebidas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lacteos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Otros',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
};
