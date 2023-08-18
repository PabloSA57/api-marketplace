const { Op } = require("sequelize");
const models = require("./../db/models/index")

const { Order, Customer, OrderProducts, ProductStore, sequelize } = models

class OrderService {
    constructor() {}

    async create(customerData, orderData, products, userId) {
        const customer = await Customer.create({...customerData, userId })
        const order = await Order.create({...orderData, customerId: customer.id})

            const newProducts = products.map(e => {
                const { productId, price, quantity } = e
                return {
                    price,
                    quantity,
                    orderId: order.id,
                    productId
                }
            })
            await OrderProducts.bulkCreate(newProducts)
            await products.forEach(async (e) => {
                const { productStoreId, quantity } = e
                const model = await ProductStore.findByPk(productStoreId)
                await model.decrement('quantity', { by: quantity })
            })
            return  order
    }

    async update(change, id) {
        await Order.update(change, {where: {id}})

        return { rta: "Orden actualizada" }
    }

    async findAll(condition) {
        const order = await Order.findAll({
            where: {...condition },
            include: [
                {
                    model: "customer",
                    attributes: ["latitud", "longitud", "phone", "direction", "userId"],
                    as:"Client",
                    include: [
                        {
                            model: "user", 
                            attributes: ["id","name", "lastname", "email"]
                        }
                    ]
                },
                {
                    model: "store",
                    attributes: ["id", "name", "phone", "latitud", "longitud", "direction"]
                },
                {
                    model: "orderproduct",
                    attributes: ["id", "price", "quantity"],
                    include: [
                        {
                            model: 'product',
                            attributes: ["id", "name", "imgurl", "unit", "category_name"]
                        }
                    ]
                }
            ],
            attributes: ["id", "date", "amount", "state", "num_order", "payment_type", "delivery", "createdAt"],
            order: ['createdAt', 'DESC'],
        })
        return order
    }

    async get(type, id){
        let condition;
        if(type === 'store') condition = {storeId: { [Op.eq]: id }}
        if(type === 'customer') {
            condition = {'$Client.userId$': { [Op.eq]: id }}
        }
        if(type === 'order') condition = {id: { [Op.eq]: id }}

        const order = await this.findAll(condition)
        return order
    }

    async countandsum(storeId) {
        const statistics = await Order.findAll({
            where: {storeId},
            attributes: [
                [sequelize.fn("count", conn.col("id")), "count"],
                [sequelize.fn("sum", conn.col("amount")), "amount"],
            ]
        })
        return statistics
    }
}

module.exports = OrderService