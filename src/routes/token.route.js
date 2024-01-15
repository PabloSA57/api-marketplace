const express = require("express");
const TokenService = require("../services/token.service");
const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");

const router = express.Router();

const service = new TokenService();

router.get("/", routerPrivate, checkRole("seller"), async (req, res, next) => {
  const storeId = req._storeId;
  try {
    const token = await service.find({ where: { storeId } });
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
