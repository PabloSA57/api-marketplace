const Joi = require("joi");
const { createProductStoreSchema } = require("./productStore.schema");
const { ProductSchema } = require("./product.schema");

const amount = Joi.number();
const state = Joi.string().valid("pendding", "success", "cancelled");
const payment = Joi.string().valid("cash", "mp");
const delivery = Joi.boolean();
const storeId = Joi.number();

//Customer
const longitud = Joi.number();
const latitud = Joi.number();
const direction = Joi.string().min(5);
const phone = Joi.number();
const userId = Joi.string();

//Product
const id = Joi.number().integer();
const name = Joi.string();
const unit = Joi.string().valid("kg", "unit");
const imgurl = Joi.string();
const category = Joi.string();

const CreateOrderSchema = Joi.object({
  amount: amount.required(),
  state,
  paymentType: payment.required(),
  delivery: delivery.required(),
  state,
  storeId: storeId.required(),
});

const productSchema = {
  productId: id,
  name: name.required(),
  unit_measurement: unit.required(),
  imgurl: imgurl.required(),
  category_name: category.required(),
};

const CreatCustomerSchema = Joi.object({
  longitud,
  latitud,
  direction,
  phone,
  userId,
});

const ProductAuxSchema = createProductStoreSchema.keys(productSchema);
const arraySchemaProduct = Joi.array().items(ProductAuxSchema);

const PaySchema = Joi.object({
  products: arraySchemaProduct,
  customer: CreatCustomerSchema,
  orderData: CreateOrderSchema,
});

module.exports = { PaySchema };
