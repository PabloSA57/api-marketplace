const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler.js')
const schemas = require('./../schemas/product.schema.js');
const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('../middlewares/role');

const router = express.Router()
const service = new ProductService()

const {CreateProductSchema} = schemas

router.post("/",
validatorHandler(CreateProductSchema, 'body'), 
async (req, res, next) => {
    try {
        const products = await service.create(req.body)
        res.status(201).json(products)
    } catch (error) {
      next(error)  
    }
})
router.get("/", 
async (req, res, next) => {
    try {
        const products = await service.findAll()
        res.status(200).json(products)
    } catch (error) {
      next(error)  
    }
})

module.exports = router