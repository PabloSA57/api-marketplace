const express = require("express");
const OrderService = require("./../services/order.service");
const validatorHandler = require("./../middlewares/validator.handler.js");

const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");
const { PaySchema } = require("../schemas/order.schema.js");

const router = express.Router();
const service = new OrderService();

//getAllOrder
router.get(
  "/",
  routerPrivate,
  checkRole("seller", "client"),
  async (req, res, next) => {
    const id = req._storeId || req._user.userId;
    const { type, state } = req.query;
    console.log(id, type);
    try {
      const response = await service.get(type, id, state);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//getOne
router.get("/:id", routerPrivate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findOne(id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.put(
  "/:orderId",
  routerPrivate,
  checkRole("seller"),
  async (req, res, next) => {
    const { orderId } = req.params;

    try {
      const response = await service.changeState(orderId, req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//createOrder
router.post(
  "/",
  routerPrivate,
  validatorHandler(PaySchema, "body"),
  async (req, res, next) => {
    const data = req.body;
    const { userId } = req._user;

    const { orderData, products, customer } = data;
    console.log(orderData, "orderData");
    try {
      const response = await service.create(
        customer,
        orderData,
        products,
        userId
      );

      res.status(201).json({ msg: "Se creo correctamente" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
