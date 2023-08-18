const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler.js')
const schemas = require('./../schemas/product.schema.js');
const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('./../middlewares/role');

const router = express.Router()
const service = new ProductService()

const {CreateProductSchema} = schemas

router.post("/",
routerPrivate,
checkRole("admin", "seller"),
validatorHandler(CreateProductSchema, 'body'), 
async (req, res, next) => {
    try {
        const products = await service.create(req.body)
        res.status(201).json(products)
    } catch (error) {
      next(error)  
    }
})

router.get("/toaddstore",
routerPrivate,
checkRole("admin", "seller"), 
async (req, res, next) => {
  const storeId = req._storeId
    try {
        const products = await service.findToAddStore(storeId)
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

router.put("/:id", 
async (req, res, next) => {
  const { id } = req.params
  const data = req.body
  try {
    const product = await service.update(id, data)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}
)
router.delete("/:id", 
async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await service.delete(id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}
)

module.exports = router