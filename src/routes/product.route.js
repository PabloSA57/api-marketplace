const express = require("express");

const ProductService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler.js");
const schemas = require("./../schemas/product.schema.js");
const routerPrivate = require("../middlewares/routePrivate");
const checkRole = require("./../middlewares/role");
const { upload, cloudinary } = require("../libs/cloudinary.js");
const { paramsSchema } = require("../schemas/productStore.schema.js");

const router = express.Router();
const service = new ProductService();

const { CreateProductSchema, ProductSchema } = schemas;

//createOne
router.post(
  "/",
  upload.single("image"),
  routerPrivate,
  checkRole("seller"),
  async (req, res, next) => {
    const storeId = req._storeId;
    console.log(req.body, "body");
    try {
      const cloud = await cloudinary.uploader.upload(req.file.path);
      const product = await service.create({
        ...req.body,
        imgurl: cloud.url,
        storeId,
      });
      res.status(201).json({ msg: "created", data: product });
    } catch (error) {
      next(error);
    }
  }
);
//bulkCreate
router.post(
  "/a",
  validatorHandler(CreateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const products = await service.bulkCreate(req.body);
      res.status(201).json(products);
    } catch (error) {
      next(error);
    }
  }
);

//getAllProductStore
router.get(
  "/store",
  routerPrivate,
  checkRole("seller"),
  async (req, res, next) => {
    const storeId = req._storeId;
    try {
      const products = await service.findProductStore(storeId);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

//getProductInStock
router.get(
  "/instock/:storeId",
  validatorHandler(paramsSchema, "params"),
  routerPrivate,
  checkRole("admin", "client"),
  async (req, res, next) => {
    const { storeId } = req.params;
    try {
      const products = await service.findProductsInStock(storeId);
      res.status(200).json(products);
    } catch (error) {
      console.log("error");
      next(error);
    }
  }
);

//Update
router.put("/:id", upload.single("file"), async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  console.log(req.body, " :Data");
  console.log(req.file, " :File");
  let data = {
    ...body,
    state: body.state === "true" ? true : false,
    price: Number.parseInt(body.price),
    quantity: Number.parseInt(body.quantity),
  };
  try {
    if (req.file) {
      const cloud = await cloudinary.uploader.upload(req.file.path);
      data = { ...data, imgurl: cloud.url };
    }
    const product = await service.update(id, data);
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    next(error);
  }
});

//Delete
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await service.delete(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
