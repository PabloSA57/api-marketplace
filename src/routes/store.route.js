const express = require("express");

const StoreService = require("./../services/store.service");
const CustomerService = require("./../services/customer.service");
const validatorHandler = require("./../middlewares/validator.handler.js");
const schemas = require("./../schemas/store.schema.js");
const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("../middlewares/role");
const { updateObject_ALG } = require("../libs/algolia.js");
const { upload, cloudinary } = require("../libs/cloudinary.js");

const service = new StoreService();
const serviceCustomer = new CustomerService();
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
router.get("/around", routerPrivate, async (req, res, next) => {
  const { userId } = req._user;

  try {
    const customer = await serviceCustomer.find(userId);
    console.log("customer", customer);
    if (!customer?.latitud || !customer?.longitud) {
      res.status(200).json([]);
      return;
    }
    const store = await service.getStoreAround({
      latitud: customer.latitud,
      longitud: customer.longitud,
    });
    console.log(store, "store");
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
});
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
  upload.single("file"),
  async (req, res, next) => {
    const storeId = req._storeId;
    const { latitud, longitud, ...rest } = req.body;

    console.log(req.body, ": Body");
    let data = {
      ...rest,
    };
    try {
      if (latitud && longitud) {
        const object = await updateObject_ALG({
          _geoloc: {
            lat: Number.parseFloat(latitud),
            lng: Number.parseFloat(longitud),
          },
          objectID: storeId,
        });

        console.log(object);

        data = {
          ...data,
          latitud,
          longitud,
        };
      }
      if (req.file) {
        const cloud = await cloudinary.uploader.upload(req.file.path);
        data = { ...data, imgurl: cloud.url };
      }

      console.log(data, "data");
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
router.get("/store/:storeId", async (req, res, next) => {
  const { storeId } = req.params;
  try {
    const store = await service.findOne({ id: storeId });
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
