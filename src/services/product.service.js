const { Op } = require("sequelize");
const models = require("./../db/models/index");
const ProductStoreService = require("./productStore.service");
const CloudinaryService = require("./cloudinary.service");
const { Product } = models;

const productStoreService = new ProductStoreService();

class ProductService {
  constructor() {}

  async create(data) {
    console.log(data, "data");
    const product = await Product.create(data);
    return product;
  }

  async bulkCreate(data) {
    const products = await Product.bulkCreate(data);
    return products;
  }

  //find
  async findAll(condition) {
    const products = await Product.findAll({ where: condition });

    return products;
  }

  //productStore
  async findProductStore(storeId) {
    console.log("storeId", storeId);
    const products = await this.findAll({ storeId });
    return products;
  }

  async findProductsInStock(storeId) {
    //const products = await store.getProducts({where: {id:1}})
    const products = await this.findAll({
      storeId,
      state: true,
      quantity: { [Op.gt]: 0 },
      price: { [Op.gt]: 0 },
    });
    return products;
  }

  async findToAddStore(storeId) {
    const productstore = await productStoreService.find({
      where: { storeId },
      attributes: ["id", "productId"],
    });
    const productsId = productstore.map((e) => e.productId);
    const products = await Product.findAll({
      where: { id: { [Op.notIn]: productsId } },
    });

    return products;
  }

  async delete(id) {
    const model = await Product.findByPk(id);
    await model.destroy();

    return { rta: "Producto eliminado" };
  }

  async update(id, change) {
    console.log("data", change);
    await Product.update(change, {
      where: { id },
    });

    return { rta: "Producto actualizado" };
  }
}

module.exports = ProductService;
