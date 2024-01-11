"use strict";
const { Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require("./user");

const STORE_TABLE = "stores";

const SchemaStore = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
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
  imgurl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  direction: {
    type: DataTypes.STRING,
  },
  open: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  payment_type: {
    type: DataTypes.ENUM("cash", "mp", "both"),
    defaultValue: "cash",
  },
  active_type: {
    type: DataTypes.ENUM("cash", "mp", "both"),
    defaultValue: "cash",
  },
  userId: {
    field: "user_id",
    type: DataTypes.UUID,
    allowNull: false,
    reference: {
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
};

module.exports = {
  STORE_TABLE,
  SchemaStore,
  func(sequelize, DataTypes) {
    class Store extends Model {
      static associate(models) {
        this.belongsTo(models.User, {
          as: "user",
          foreignKey: { name: "userId" },
        });

        this.hasMany(models.Product, {
          foreignKey: "storeId",
          as: "product",
        });
        this.hasMany(models.Order, {
          foreignKey: "storeId",
          as: "order",
        });
        this.hasOne(models.Token, {
          foreignKey: "storeId",
          as: "token",
        });
      }
    }
    Store.init(SchemaStore, {
      sequelize,
      tableName: STORE_TABLE,
      modelName: "Store",
      timestamps: true,
      createdAt: true,
    });
    return Store;
  },
};
