"use strict";
const { Model, DataTypes } = require("sequelize");
const { STORE_TABLE } = require("./store");
const { USER_TABLE } = require("./user");

const ORDER_TABLE = "orders";

const SchemaOrder = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM("pendding", "success", "cancelled"),
    defaultValue: "pendding",
  },
  num_order: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentType: {
    type: DataTypes.ENUM("cash", "mp", "both"),
    defaultValue: "cash",
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  delivery: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: STORE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
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
};

module.exports = {
  ORDER_TABLE,
  SchemaOrder,
  func(sequelize) {
    class Order extends Model {
      static associate(models) {
        this.belongsTo(models.Store, {
          as: "store",
          foreignKey: { name: "storeId" },
        });
        this.hasMany(models.OrderProducts, {
          foreignKey: "orderId",
          as: "orderproduct",
        });
        this.hasOne(models.InfoSend, {
          foreignKey: "orderId",
          as: "infosend",
        });
        this.belongsTo(models.User, {
          as: "customer",
          foreignKey: { name: "customerId" },
        });
      }
    }
    Order.init(SchemaOrder, {
      sequelize,
      modelName: "Order",
      tableName: ORDER_TABLE,
      timestamps: true,
      createdAt: true,
    });
    return Order;
  },
};
