const models = require("./../db/models/index");
const { Token } = models;

class TokenService {
  constructor() {}

  async create(data) {
    const token = await Token.create(data);

    return token;
  }

  async find(condition) {
    const token = await Token.findOne(condition);

    return token;
  }

  async update(change, storeId) {
    await Token.update(change, { where: { storeId } });

    return { rta: "Token actualizado" };
  }
}

module.exports = TokenService;
