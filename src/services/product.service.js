const models = require('./../db/models/index')
const { Product } = models

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

    async findToAddStore(){
        Product.findAll()
    }

    async delete(id){

    } 

    async update(id) {

    }
}

module.exports = ProductService