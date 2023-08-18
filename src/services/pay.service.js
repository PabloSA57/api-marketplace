const MercadoPagoService = require("./mercadoPago.service")
const OrderService = require("./order.service")

const orderService = new OrderService()
const mercadoPagoService = new MercadoPagoService()

class PayService {
    constructor() {}

    async pay(data, userId) {
        const { orderData, products, customer} = data

        if(orderData.payment === "cash") {
            await orderService.create(customer, orderData, products, userId)
            return { rta: "Orden creada" }
        }

        if(orderData.payment === "mp"){
            const { init_point, id } = await mercadoPagoService.checkout(orderData)
            await orderService.create(customer, {...orderData, id}, products, userId)
            return init_point
        }
        console.log("aquiii")
    }
}

module.exports = PayService