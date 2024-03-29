const models = require("./../db/models/index");
const StoreService = require("./store.service");

const { ProductStore, Product } = models;
const storeService = new StoreService();

class ProductStoreService {
  constructor() {}

  async addProductToStore(productsId, userId) {
    const store = await storeService.findOne({ userId });
    const products = await Product.findAll({ where: { id: productsId } });
    console.log(products);
    await store.addProduct(products);

    return { rta: "Se agregaron correctamente" };
  }

  async find(condition) {
    const products = await ProductStore.findAll(condition);

    return products;
  }

  async findProducts(storeId) {
    console.log("storeId", storeId);
    const products = await this.find({
      where: { storeId },
      include: "info_product",
      order: [["id", "DESC"]],
    });
    return products;
  }

  async update(change, productId, storeId) {
    console.log("change:", change, " id:", productId);
    const product = await ProductStore.update(change, {
      where: { id: productId, storeId },
    });

    return { rta: "Se actualizo correctamente", product };
  }

  //allowNull "orderproduct"
  async delete(id) {
    console.log(id, "ID product");
    const model = await ProductStore.findByPk(id);
    await model.destroy();
    return { rta: "Se borro correctamente" };
  }

  async findProductsStore(storeId) {
    //const products = await store.getProducts({where: {id:1}})
    const products = await this.find({
      where: { storeId, state: true },
      include: [
        {
          model: Product,
          as: "info_product",
        },
      ],
    });
    return products;
  }
}

module.exports = ProductStoreService;
