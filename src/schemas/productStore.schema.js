const Joi = require("joi");

const id = Joi.number().integer();
const quantity = Joi.number();
const price = Joi.number();
const state = Joi.boolean();

const addProductSchema = Joi.object({
  productsId: Joi.array().items(id),
});

const updateProductSchema = Joi.object({
  quantity,
  price,
  state,
});

const paramsSchema = Joi.object({
  productId: id,
  storeId: id,
});

const getProductsForIdSchema = Joi.object({
  productsId: Joi.array().items(id),
});
const createProductStoreSchema = Joi.object({
  productStoreId: id,
  quantity,
  price,
  state,
});

module.exports = {
  addProductSchema,
  updateProductSchema,
  paramsSchema,
  createProductStoreSchema,
  getProductsForIdSchema,
};
