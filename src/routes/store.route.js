const express = require("express");

const StoreService = require("./../services/store.service");
const validatorHandler = require("./../middlewares/validator.handler.js");
const schemas = require("./../schemas/store.schema.js");
const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");

const service = new StoreService();
const {
  createStoreSchema,
  getStoreAroundSchema,
  deleteStore,
  updateStoreChange,
} = schemas;

const router = express.Router();

router.post(
  "/",
  validatorHandler(createStoreSchema, "body"),
  async (req, res, next) => {
    try {
      const store = await service.create(req.body);
      res.status(201).json(store);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/around",
  routerPrivate,
  validatorHandler(getStoreAroundSchema, "query"),
  async (req, res, next) => {
    try {
      const store = await service.getStoreAround(req.query);
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  routerPrivate,
  checkRole("seller"),
  validatorHandler(deleteStore, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const store = await service.delete(id);
      console.log("aqui4");
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/",
  routerPrivate,
  checkRole("seller"),
  validatorHandler(updateStoreChange, "body"),
  async (req, res, next) => {
    const storeId = req._storeId;
    const data = req.body;
    try {
      const store = await service.update(storeId, data);
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const store = await service.findOne({ userId: userId });
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
