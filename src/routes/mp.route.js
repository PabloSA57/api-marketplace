const express = require('express');

const MercadoPagoService = require('./../services/mercadoPago.service');
const validatorHandler = require('./../middlewares/validator.handler.js')

const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('../middlewares/role');

const router = express.Router()
const service = new MercadoPagoService()

router.get('/redirect', 
async (req, res, next) => {
    const { code } = req.query;
    const storeId = req.session.storeId
    console.log(req.query)
    try {
        const response = await service.redirect(storeId, code)
        res.json(response);
    } catch (error) {
        next(error)
    }
} )

router.get('/auth',
routerPrivate,
checkRole("seller", "admin"), 
async (req, res, next) => {
    const storeId  = req._storeId
    try {
        const authUrl = await service.auth()
        req.session.storeId = storeId
        res.redirect(authUrl);
    } catch (error) {
        next(error)
    }
}
)

router.get('/notification', 
async (req, res, next) => {
    const { status, preference_id } = req.query;
    try {
        const response = await service.notification(status, preference_id)

        res.json(response)
    } catch (error) {
        next(error)
    }
}
)

module.exports = router