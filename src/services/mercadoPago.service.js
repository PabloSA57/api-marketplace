require("dotenv").config();
const axios = require('axios')

const models = require('./../db/models/index')

const { CLIENT_SECRET, CLIENT_ID, APP_ID } = process.env
const REDIRECT_URI = "https://api-marketplace.onrender.com/api/v1/mp/redirect"
const REDIRECT_URI_DEV = "http://localhost:3001/api/v1/mp/redirect"
const { Token } = models


class MercadoPagoService {
    constructor() {}

    async auth(req,res) {
        const authUrl = `https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&redirect_uri=${REDIRECT_URI}`;
        req.session.name = 'Pablo'
        res.redirect(authUrl);
    }

    async redirect(req,code) {
        console.log(req.session.name)
        const { data } = await axios.post('https://api.mercadopago.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
                redirect_uri: REDIRECT_URI,
            },
        });

        console.log(data)
        //await this.saveToken({access_token: data.access_token})

        return {rta: 'Todo correcto'}
    }

    async saveToken(data) {
        const token = await Token.create(data)

        return token
    }
}
module.exports = MercadoPagoService