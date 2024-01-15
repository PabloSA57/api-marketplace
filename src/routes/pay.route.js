const express = require("express");

const ProductService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler.js");
const schemas = require("./../schemas/order.schema.js");
const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");
const PayService = require("../services/pay.service");

const payService = new PayService();
const router = express.Router();

router.post("/", routerPrivate, checkRole("client"), async (req, res, next) => {
  const { products, storeId } = req.body;

  try {
    const response = payService.pay(products, storeId);

    //socket.emit("notification", { list: "hola", id: socket.id });
    res.status(200).json({ init_point: response, msg: "success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
