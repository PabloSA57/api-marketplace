const express = require("express");

const MercadoPagoService = require("./../services/mercadoPago.service");

const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");

const router = express.Router();
const service = new MercadoPagoService();

module.exports = (getUserSockets, io) => {
  router.post(
    "/redirect",
    routerPrivate,
    checkRole("seller"),
    async (req, res, next) => {
      const { code } = req.query;
      const storeId = req._storeId;

      try {
        const response = await service.redirect(storeId, code);

        res.json(response);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/auth",
    routerPrivate,
    checkRole("seller"),
    async (req, res, next) => {
      const storeId = req._storeId;
      try {
        const authUrl = await service.auth(storeId);
        res.status(200).json(authUrl);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get("/notification", async (req, res, next) => {
    const { status, orderId, storeId, customerId } = req.query;
    try {
      await service.notification(status, orderId, storeId, customerId);
      const user = getUserSockets()?.filter((e) => e.id == storeId);

      user.length > 0 &&
        io.to(user[0].sockeId).emit("notification", {
          msg: `La orden ${orderId} fue pagada`,
        });
      // res.redirect(`${process.env.URL_FRONTEND}/inicio`);
      res.send("hello");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
