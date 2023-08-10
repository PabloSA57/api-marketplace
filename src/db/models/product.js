"use strict";
const { Model, DataTypes } = require("sequelize");
const { CATEGORY_TABLE } = require("./category");

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
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryName: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: CATEGORY_TABLE,
      key: "name",
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
        this.belongsTo(models.Category, {as: 'category',foreignKey: { name: 'categoryName'}});
       this.belongsToMany(models.Store, { through: models.ProductStore,foreignKey:'storeId', otherKey:'productId' });
        this.hasMany(models.ProductStore, {
          foreignKey: "productId",
          as: 'productstore'
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
