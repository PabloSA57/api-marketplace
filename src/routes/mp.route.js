const express = require('express');

const CartegoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler.js')

const routerPrivate = require('../middlewares/routePrivate');
const checkRole = require('../middlewares/role');

const router = express.Router()

router.get('/redirect', (req, res, next) => {

    console.log(req.params)
    console.log(req.query)
    try {
        res.send('MpRedirect')
    } catch (error) {
        next(error)
    }
} )

module.exports = router