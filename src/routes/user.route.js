const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler.js')
const schemas = require('./../schemas/user.schema.js')

const {createUserSchema, loginUserSchema} = schemas
const router = express.Router()
const service = new UserService()

router.post('/',
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
    
    try {
        const user = await service.register(req.body)
        res.status(201).json(user)
    } catch(error) {
        next(error)
    }
})
router.get('/login',
validatorHandler(loginUserSchema, 'body'),
async (req, res, next) => {
    
    try {
        const token = await service.login(req.body)
        res.status(200).json(token)
    } catch(error) {
        next(error)
    }
})

module.exports = router
