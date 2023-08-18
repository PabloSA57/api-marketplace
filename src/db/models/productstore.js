"use strict";
const { Model, DataTypes } = require("sequelize");
const { STORE_TABLE } = require("./store");
const { PRODUCT_TABLE } = require("./product");

const PRODUCTSTORE_TABLE = "productstore";
const SchemaProductStore = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    },
  storeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: STORE_TABLE,
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
  PRODUCTSTORE_TABLE,
  SchemaProductStore,
  func(sequelize, DataTypes) {
    class ProductStore extends Model {
      static associate(models) {
        this.belongsTo(models.Product, {as:'product',foreignKey: { name: 'productId'} });
        this.belongsTo(models.Store, {as:'store',foreignKey: { name: 'storeId'} });
        this.hasMany(models.OrderProducts, {as: "orderproduct", foreignKey: "productId"})
      }
    }
    ProductStore.init(SchemaProductStore, {
      sequelize,
      modelName: "ProductStore",
      tableName: PRODUCTSTORE_TABLE,
      timestamps: true,
      createdAt: true,
    });
    return ProductStore;
  },
};
