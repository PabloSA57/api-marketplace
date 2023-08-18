const { Op } = require("sequelize");
const models = require('./../db/models/index');
const ProductStoreService = require('./productStore.service');
const { Product } = models

const productStoreService = new ProductStoreService()

class ProductService {
    constructor(){}

    async create(data) {
        const products = await Product.bulkCreate(data);
        return products
    } 

    async findAll(condition) {
        const products = await Product.findAll({where: condition})

        return products
    }

    async findToAddStore(storeId){
        const productstore = await productStoreService.find({where: {storeId}, attributes: ["id", "productId"]})
        const productsId = productstore.map(e => e.productId)
        const products = await Product.findAll({where: {id: {[Op.notIn]: productsId }}})

        return products
    }

    async delete(id){
        const model = await this.findByPk(id)
        await model.destroy()

        return {rta: "Producto eliminado"}
    } 

    async update(id, change) {
        await Product.update({change, where: {id}})

        return { rta: "Producto actualizado" }
    }
}

module.exports = ProductService