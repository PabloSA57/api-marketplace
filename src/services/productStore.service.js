const models = require('./../db/models/index')
const StoreService = require('./store.service')
const ProductService = require('./product.service')

const { ProductStore, Product } = models
const storeService = new StoreService()
const productService = new ProductService()


class ProductStoreService {
    constructor(){}

    async addProductToStore(productsId, userId){
        const store = await storeService.findOne({userId})
        const products = await productService.findAll({id: productsId})
       
        const resp = await store.addProduct(products)

        return resp
    }

    async find(condition){
        const products = await ProductStore.findAll(condition)

        return products
    }

    async findProducts(userId) {
        const store = await storeService.findOne({userId})
        //const products = await store.getProducts({where: {id:1}})
        const products = await this.find({
            where: {storeId: store.id},
            include: 'product'
        })
        return products
    }

    async update(change, productId){
        console.log("change:",change, " id:", productId)
        const product = await ProductStore.update(change, {where: {id: productId}})

        return {rta: "Se actualizo correctamente", product}
    }

    async delete(id){
        console.log(id, "ID product")
        const model = await ProductStore.findByPk(id)
        await model.destroy()
        return {rta: 'Se borro correctamente'}
    }

    async findProductsStore(id) {
        const store = await storeService.findOne({id})
        //const products = await store.getProducts({where: {id:1}})
        const products = await this.find({
            where: {storeId: store.id, state: true},
            include: 'product'
        })
        return products
    }
}

module.exports = ProductStoreService