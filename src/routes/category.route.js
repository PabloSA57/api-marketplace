const express = require('express');

const CartegoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler.js')

const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('../middlewares/role');

const router = express.Router()
const service = new CartegoryService()


router.post("/",
routerPrivate,
checkRole('admin', 'seller'),
async (req, res, next) => {
    try {
        const categories = await service.create(req.body)

        res.status(201).json(categories)
    } catch (error) {
        next(error)
    }
}
)

module.exports = router
