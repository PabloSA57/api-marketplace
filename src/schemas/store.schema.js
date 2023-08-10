const Joi = require('joi');
const {createUserSchema} = require('./user.schema')

const id = Joi.number().integer();
const nameStore = Joi.string();
const longitud = Joi.number();
const latitud = Joi.number();
const direction = Joi.string().min(5);
const phone = Joi.number();

const createStoreSchema = createUserSchema.keys({
    nameStore: nameStore.required(),
    longitud: longitud.required(),
    latitud: latitud.required(),
    direction: direction.required(), 
    phone: phone.required()
})

const getStoreAroundSchema = Joi.object({
    latitud: latitud.required(),
    longitud: longitud.required()
})
const deleteStore = Joi.object({
    id: id.required(),
})



module.exports = {createStoreSchema, getStoreAroundSchema, deleteStore}