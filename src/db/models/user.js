"use strict";
const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "users";
const SchemaUser = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "El email tiene que ser un correo valido",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgurl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("seller", "client", "admin"),
    allowNull: false,
  },
  verifyEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  USER_TABLE,
  SchemaUser,
  func(sequelize) {
    class User extends Model {
      static associate(models) {
        // define association here
        this.hasOne(models.Store, {
          foreignKey: "userId",
          as: "store",
        });
        this.hasMany(models.Order, {
          foreignKey: "customerId",
          as: "order",
        });
        this.hasOne(models.Customer, {
          foreignKey: "userId",
          as: "customer",
        });
      }
    }
    User.init(SchemaUser, {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    });
    return User;
  },
};
