const models = require("../db/models");

const { Customer, User } = models;

class CustomerService {
  constructor() {}

  async find(id) {
    const customer = await Customer.findOne({
      where: { userId: id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "lastname", "email"],
        },
      ],
    });

    const user = customer.dataValues.user.dataValues;
    const { user: q, ...rest } = customer.dataValues;

    console.log(rest);
    return { ...user, ...rest };
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
