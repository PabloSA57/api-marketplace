const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const unit = Joi.string().valid("kg", "unit");
const imgurl = Joi.string();
const category_name = Joi.string();

const ProductSchema = Joi.object({
    name: name.required(),
    unit: unit.required(),
    imgurl: imgurl.required(),
    category_name: category_name.required()
})

const CreateProductSchema = Joi.array().items(ProductSchema)

module.exports = {CreateProductSchema, ProductSchema}