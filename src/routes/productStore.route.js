const express = require('express');

const ProductStoreService = require('./../services/productStore.service');
const validatorHandler = require('./../middlewares/validator.handler.js')
const schemas = require('./../schemas/productStore.schema.js');
const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('../middlewares/role');

const router = express.Router()
const service = new ProductStoreService()

const {addProductSchema, updateProductSchema, paramsSchema } = schemas

router.post("/",
validatorHandler(addProductSchema, 'body'),
routerPrivate,
checkRole('admin', "seller"), 
async (req, res, next) => {
    const { productsId } = req.body
    const { userId } = req._user
    try {
        const products = await service.addProductToStore(productsId, userId)
        res.status(201).json(products)
    } catch (error) {
        next(error)
    }
}
)

router.get("/",
routerPrivate,
checkRole('admin', "seller"), 
async (req, res, next) => {
    const {userId} = req._user
    try {
        const products = await service.findProducts(userId)
        res.status(200).json(products)
    } catch (error) {
        console.log('error')
        next(error)
    }
}
)

router.get('/instock/:storeId',
validatorHandler(paramsSchema, 'params'),
routerPrivate,
checkRole('admin', "client"),  
async (req, res, next) => {
    const { storeId } = req.params
    try {
        const products = await service.findProductsStore(storeId)
        res.status(200).json(products)
    } catch (error) {
        console.log('error')
        next(error)
    }
}
)

router.put('/:productId',
validatorHandler(paramsSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
routerPrivate,
checkRole('admin', "seller"),  
async (req, res, next) => {
    const data = req.body
    const { productId } = req.params
    try {
        const products = await service.update(data, productId)
        res.status(200).json(products)
    } catch (error) {
        console.log('error')
        next(error)
    }
}
)

router.delete('/:productId',
validatorHandler(paramsSchema, 'params'),
routerPrivate,
checkRole('admin', "seller"),  
async (req, res, next) => {
    const { productId } = req.params
    try {
        const products = await service.delete(productId)
        res.status(200).json(products)
    } catch (error) {
        console.log('error')
        next(error)
    }
}
)

module.exports = router