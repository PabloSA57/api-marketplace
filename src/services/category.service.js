const models = require('./../db/models/index')
const {Category} = models

class CategoryService {
    constructor(){}

    async create(data){
        const categories = await Category.bulkCreate(data);
        
        return categories
    }

    async delete(id){
        const model = await Category.findByPk(id)
        await model.detroy()

        return {rta: 'categoria eliminada'}
    }
}

module.exports = CategoryService