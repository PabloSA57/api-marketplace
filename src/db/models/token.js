'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const { STORE_TABLE } = require("./store");
const TOKEN_TABLE = "tokens"
const SchemaToken = {
  access_token:{
    type: DataTypes.STRING,
    allowNull: false
},
refresh_token: {
    type: DataTypes.STRING,
    allowNull: false
},
public_key: {
    type: DataTypes.STRING
},
storeId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
  reference: {
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
}
module.exports = {
  TOKEN_TABLE,
  SchemaToken,
  func(sequelize) {
  class Token extends Model {
   
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {as:'store',foreignKey: { name: 'storeId'} })
    }
  }
  Token.init(SchemaToken, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
}};