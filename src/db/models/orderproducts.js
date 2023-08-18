'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const { ORDER_TABLE } = require('./order');
const { PRODUCTSTORE_TABLE } = require('./productstore');

const ORDERPRODUCTS_TABLE = 'orderproduct'
const SchemaOrderProduct = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.FLOAT,
  },
  orderId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: ORDER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTSTORE_TABLE,
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
  ORDERPRODUCTS_TABLE,
  SchemaOrderProduct,
  func(sequelize) {
  class OrderProducts extends Model {
    static associate(models) {
     this.belongsTo(models.Order, {as:'order',foreignKey: { name: 'orderId'} })
     this.belongsTo(models.Product, {as:'product',foreignKey: { name: 'productId'} })
    }
  }
  OrderProducts.init(SchemaOrderProduct, {
    sequelize,
    tableName: ORDERPRODUCTS_TABLE,
    modelName: 'OrderProducts',
    timestamps: true,
    createdAt: true,
  });
  return OrderProducts;
}};