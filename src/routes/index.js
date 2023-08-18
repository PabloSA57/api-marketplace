const express = require('express');

const usersRouter = require('./user.route.js')
const storesRouter = require('./store.route.js')
const categoryRouter = require('./category.route.js')
const productsRouter = require('./product.route.js')
const productsStoreRouter = require('./productStore.route.js')
const mpRouter = require('./mp.route.js')
const payRouter = require('./pay.route.js')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/stores', storesRouter);
    router.use('/category', categoryRouter);
    router.use('/products', productsRouter);
    router.use('/products-store', productsStoreRouter);
    router.use('/mp', mpRouter);
    router.use('/pay', payRouter);
  }
  
  module.exports = routerApi;