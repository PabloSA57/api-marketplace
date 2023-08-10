const Joi = require('joi');

const id = Joi.number().integer();
const stock = Joi.number();
const price = Joi.number();
const state = Joi.boolean();

const addProductSchema = Joi.object({
    productId: Joi.array().items(id)
})

const updateProductSchema = Joi.object({
    stock,
    price,
    state
})

const paramsSchema = Joi.object({
    productId: id,
    storeId: id
})

module.exports = { addProductSchema, updateProductSchema, paramsSchema }