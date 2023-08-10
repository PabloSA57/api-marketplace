"use strict";
const { Model, DataTypes } = require("sequelize");

const CATEGORY_TABLE = "categories";

const SchemaCategory = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
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
  CATEGORY_TABLE,
  SchemaCategory,
  func(sequelize) {
    class Category extends Model {
      static associate(models) {
        // define association here
        this.hasMany(models.Product, {
          foreignKey: "categoryName",
          as: 'product'
        });
      }
    }
    Category.init(SchemaCategory, {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: true,
      createdAt: true,
    });
    return Category;
  },
};
