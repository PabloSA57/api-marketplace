require("dotenv").config();
const axios = require("axios");
const boom = require("@hapi/boom");

const models = require("./../db/models/index");
const OrderService = require("./order.service");
const StoreService = require("./store.service");

const { CLIENT_SECRET, CLIENT_ID, APP_ID, URL_REDIRECT_MP, URL } = process.env;

const { Token } = models;

const orderService = new OrderService();
const storeService = new StoreService();

class MercadoPagoService {
  constructor() {}

  async auth() {
    const authUrl = `https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&redirect_uri=${URL_REDIRECT_MP}`;
    return authUrl;
  }

  async redirect(storeId, code) {
    console.log(code, storeId, " redirect mp");
    try {
      const response = await axios.post(
        "https://api.mercadopago.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: `${URL_REDIRECT_MP}`,
          },
        }
      );

      console.log("response: ", response);
      const { access_token, refresh_token, public_key, expires_in } =
        await response.data;

      await this.saveToken({
        access_token,
        refresh_token,
        public_key,
        expire_in: expires_in,
        storeId,
      });

      await storeService.update(storeId, { payment_type: "both" });
    } catch (error) {
      console.log(error, "errorMP");
    }

    //console.log(data, "data");
    return { rta: "Todo correcto" };
  }

  async saveToken(data) {
    const token = await Token.create(data);

    return token;
  }

  async checkout(products, storeId, orderId, customerId) {
    const token = await Token.findOne({ where: { storeId } });
    if (!token || !token.access_token)
      throw new boom.notFound("No tiene token");

    const items = products.map((e) => {
      return {
        id: e.id,
        title: e.name,
        description: "",
        picture_url: e.imgurl,
        category_id: e.category,
        quantity: e.quantity,
        currency_id: "ARS",
        unit_price: parseInt(e.price),
      };
    });

    const url_notification = `${URL}/mp/notification?storeId=${storeId}&orderId=${orderId}&customerId=${customerId}`;

    const preference = {
      items: items,
      auto_return: "all",
      back_urls: {
        success: url_notification,
        failure: url_notification,
        pending: url_notification,
      },
      marketplace_fee: 10,
    };

    const headers = {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        preference,
        { headers: headers }
      );

      return response.data.init_point;
    } catch (error) {
      console.log(error, "error");
      return error;
    }
  }

  async notification(status, orderId, storeId, customerId) {
    await orderService.update({ paid: status === "approved" }, orderId);

    return { rta: "listo" };
  }
}
module.exports = MercadoPagoService;
