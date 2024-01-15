require("dotenv").config();
const axios = require("axios");
const boom = require("@hapi/boom");

const models = require("./../db/models/index");

const { CLIENT_SECRET, CLIENT_ID, APP_ID, URL_REDIRECT_MP } = process.env;

const { Token } = models;

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
    } catch (error) {
      console.log(error, "errorMP");
    }

    //console.log(data, "data");
    /*const { access_token, refresh_token, public_key, expire_in } = data;

    await this.saveToken({
      access_token,
      refresh_token,
      public_key,
      expire_in,
      storeId,
    });*/
    return { rta: "Todo correcto" };
  }

  async saveToken(data) {
    const token = await Token.create(data);

    return token;
  }

  async checkout(products, storeId) {
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

    const preference = {
      items: items,
      auto_return: "all",
      back_urls: {
        success: `${URI_PRODUCTION}/notification`,
        failure: `${URI_PRODUCTION}/notification`,
        pending: `${URI_PRODUCTION}/notification`,
      },
      marketplace_fee: 10,
    };

    const headers = {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      preference,
      { headers: headers }
    );

    return response;
  }

  async notification(status, id) {
    await orderService.update({ status }, id);
    return { rta: "listo" };
  }
}
module.exports = MercadoPagoService;
