const MercadoPagoService = require("./mercadoPago.service");

const mercadoPagoService = new MercadoPagoService();

class PayService {
  constructor() {}

  async pay(products, storeId, orderId, customerId) {
    const response = await mercadoPagoService.checkout(
      products,
      storeId,
      orderId,
      customerId
    );
    console.log(response, "responseService");
    return response;
  }
}

module.exports = PayService;
