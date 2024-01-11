const models = require("../db/models");

const { Customer } = models;

class CustomerService {
  constructor() {}

  async find(id) {
    const customer = await Customer.findOne({ where: { userId: id } });

    return customer;
  }

  async update(change, userId) {
    await Customer.update(change, {
      where: {
        userId,
      },
    });

    return { message: "Se actualizo correctamente" };
  }
}

module.exports = CustomerService;
