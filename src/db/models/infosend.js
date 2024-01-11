"use strict";
const { Model, DataTypes } = require("sequelize");
const { ORDER_TABLE } = require("./order");

const INFOSEND_TABLE = "infosend";
const SchemaInfoSend = {
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
  INFOSEND_TABLE,
  SchemaInfoSend,
  func(sequelize) {
    class InfoSend extends Model {
      static associate(models) {
        // define association here
        this.belongsTo(models.Order, {
          as: "order",
          foreignKey: { name: "orderId" },
        });
      }
    }
    InfoSend.init(SchemaInfoSend, {
      sequelize,
      modelName: "InfoSend",
      tableName: INFOSEND_TABLE,
      timestamps: true,
      createdAt: true,
    });
    return InfoSend;
  },
};
