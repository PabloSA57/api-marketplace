const express = require("express");

const CustomerService = require("./../services/customer.service");
const validatorHandler = require("./../middlewares/validator.handler.js");

const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");

const router = express.Router();
const service = new CustomerService();

router.put(
  "/",
  routerPrivate,
  checkRole("admin", "client"),
  async (req, res, next) => {
    const { userId } = req._user;
    console.log(req.body, "body");
    console.log(userId, "userId");
    try {
      const response = await service.update(req.body, userId);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/",
  routerPrivate,
  checkRole("admin", "client"),
  async (req, res, next) => {
    const { userId } = req._user;
    console.log(req.body, "body");
    try {
      const response = await service.find(userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
