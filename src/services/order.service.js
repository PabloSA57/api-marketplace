const models = require("./../db/models/index")

const { Order } = models

class OrderService {
    constructor() {}

    async create(data) {
        const order = await Order.create(data)

        return order
    }
}