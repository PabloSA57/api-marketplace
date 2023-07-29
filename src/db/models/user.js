"use strict";
const { Model, DataTypes } = require("sequelize");

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
  SchemaUser,
  func(sequelize, DataTypes) {
    class User extends Model {
      static associate(models) {
        // define association here
      }
    }
    User.init(SchemaUser, {
      sequelize,
      modelName: "User",
      timestamps: true,
      createdAt: true,
    });
    return User;
  },
};
