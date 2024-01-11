"use strict";
const { Model, DataTypes } = require("sequelize");
const { CATEGORY_TABLE } = require("./category");
const { STORE_TABLE } = require("./store");

const PRODUCT_TABLE = "products";

const SchemaProduct = {
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
    allowNull: false,
  },
  unit_measurement: {
    type: DataTypes.STRING,
    allowNull: false,
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
  category_name: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: CATEGORY_TABLE,
      key: "name",
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
  PRODUCT_TABLE,
  SchemaProduct,
  func(sequelize, DataTypes) {
    class Product extends Model {
      static associate(models) {
        this.belongsTo(models.Category, {
          as: "category",
          foreignKey: { name: "category_name" },
        });
        this.belongsTo(models.Store, {
          as: "store",
          foreignKey: { name: "storeId" },
        });
        this.hasMany(models.OrderProducts, {
          as: "orderproduct",
          foreignKey: "productId",
        });
      }
    }
    Product.init(SchemaProduct, {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: true,
      createdAt: true,
    });
    return Product;
  },
};
