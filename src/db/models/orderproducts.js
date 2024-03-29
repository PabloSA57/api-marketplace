"use strict";
const { Model, DataTypes } = require("sequelize");
const { ORDER_TABLE } = require("./order");
const { PRODUCT_TABLE } = require("./product");

const ORDERPRODUCTS_TABLE = "orderproduct";
const SchemaOrderProduct = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgurl: {
    type: DataTypes.STRING,
  },
  unit_measurement: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.FLOAT,
  },
  category_name: {
    type: DataTypes.STRING,
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
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
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
};

module.exports = {
  ORDERPRODUCTS_TABLE,
  SchemaOrderProduct,
  func(sequelize) {
    class OrderProducts extends Model {
      static associate(models) {
        this.belongsTo(models.Order, {
          as: "order",
          foreignKey: { name: "orderId" },
        });
        this.belongsTo(models.Product, {
          as: "product",
          foreignKey: { name: "productId" },
        });
      }
    }
    OrderProducts.init(SchemaOrderProduct, {
      sequelize,
      tableName: ORDERPRODUCTS_TABLE,
      modelName: "OrderProducts",
      timestamps: true,
      createdAt: true,
    });
    return OrderProducts;
  },
};
