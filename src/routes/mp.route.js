const express = require("express");

const MercadoPagoService = require("./../services/mercadoPago.service");
const validatorHandler = require("./../middlewares/validator.handler.js");

const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");

const router = express.Router();
const service = new MercadoPagoService();

router.get("/redirect", async (req, res, next) => {
  const { code } = req.query;
  const storeId = req.cookies.storeId;

  console.log(req.query);
  console.log(req.cookies, "cookies redirect");
  console.log(storeId, "cookies StoreId");
  console.log(req.session.storeId, "session storeId");
  try {
    const response = await service.redirect(storeId, code);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/auth",
  routerPrivate,
  checkRole("seller"),
  async (req, res, next) => {
    const storeId = req._storeId;
    console.log(storeId, "storeId");
    try {
      const authUrl = await service.auth(storeId);
      //console.log(storeId, "storeId");
      req.session.storeId = storeId;
      res.cookie("storeId", storeId, {
        maxAge: 86400000,
        domain: "api-marketplace.onrender.com",
        path: "/**", // Reemplaza con la ruta deseada
      });

      console.log(req.cookies.storeId, "cookie desde auth");
      console.log(req.session.storeId, "sesion auth");
      res.status(200).json(authUrl);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/notification", async (req, res, next) => {
  const { status, preference_id } = req.query;
  try {
    const response = await service.notification(status, preference_id);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
