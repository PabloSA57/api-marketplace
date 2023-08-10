const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const name = Joi.string();
const lastname = Joi.string();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    password: password.required(),
    role: role.required()
  });
const loginUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
  });

module.exports = { createUserSchema, loginUserSchema }