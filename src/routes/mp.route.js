const express = require('express');

const MercadoPagoService = require('./../services/mercadoPago.service');
const validatorHandler = require('./../middlewares/validator.handler.js')

const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('../middlewares/role');

const router = express.Router()
const service = new MercadoPagoService()

router.get('/redirect', 
async (req, res, next) => {
    const { code } = req.query
    console.log(req.query)
    try {
        const response = await service.redirect(code)
        res.json(response);
    } catch (error) {
        next(error)
    }
} )

router.get('/auth', 
async (req, res, next) => {
    try {
        await service.auth(res)
    } catch (error) {
        next(error)
    }
}
)

module.exports = router