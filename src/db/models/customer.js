'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const { USER_TABLE } = require('./user');

const CUSTOMER_TABLE = 'customers'
const SchemaCustomer = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitud: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  userId: {
    allowNull: true,
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
} 

module.exports = {
  CUSTOMER_TABLE,
  SchemaCustomer,
  func(sequelize, DataTypes) {
  class Customer extends Model {

    static associate(models) {
      this.belongsTo(models.User, {as:'user',foreignKey: { name: 'userId'} })
      this.hasMany(models.Order, {
        foreignKey: 'customerId',
        as: 'order'
      })
    }
  }
  Customer.init(SchemaCustomer, {
    sequelize,
    modelName: 'Customer',
    tableName: CUSTOMER_TABLE,
    timestamps: false,
  });
  return Customer;
}
};