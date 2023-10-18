const express = require("express");

const UserService = require("./../services/user.service");
const validatorHandler = require("./../middlewares/validator.handler.js");
const schemas = require("./../schemas/user.schema.js");
const routerPrivate = require("../middlewares/routePrivate");

const { createUserSchema, loginUserSchema } = schemas;
const router = express.Router();
const service = new UserService();

router.post(
  "/register",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const user = await service.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/login",
  validatorHandler(loginUserSchema, "body"),
  async (req, res, next) => {
    try {
      const token = await service.login(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", routerPrivate, async (req, res, next) => {
  const { userId } = req._user;
  try {
    const user = await service.findOne(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
