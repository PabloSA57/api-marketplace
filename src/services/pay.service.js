const MercadoPagoService = require("./mercadoPago.service");

const mercadoPagoService = new MercadoPagoService();

class PayService {
  constructor() {}

  async pay(products, storeId) {
    const response = await mercadoPagoService.checkout(products, storeId);

    return response;
  }
}

module.exports = PayService;
