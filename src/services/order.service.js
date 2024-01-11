const { Op } = require("sequelize");
const models = require("./../db/models/index");

const { Order, User, Product, Store, OrderProducts, sequelize, InfoSend } =
  models;

class OrderService {
  constructor() {}

  async create(customerData, orderData, products) {
    const order = await Order.create({
      ...orderData,
      customerId: customerData.userId,
    });
    await InfoSend.create({
      latitud: customerData.latitud,
      longitud: customerData.longitud,
      direction: customerData.direction,
      phone: customerData.phone,
      orderId: order.id,
    });
    const newProducts = products.map((e) => {
      return {
        ...e,
        orderId: order.id,
      };
    });
    await OrderProducts.bulkCreate(newProducts);
    await products.forEach(async (e) => {
      const { productStoreId, quantity } = e;
      const model = await Product.findByPk(productStoreId);
      await model.decrement("quantity", { by: quantity });
    });
    return order;
  }

  async update(change, id) {
    await Order.update(change, { where: { id } });

    return { rta: "Orden actualizada" };
  }

  async findAll(condition) {
    const order = await Order.findAll({
      where: { ...condition },
      include: [
        {
          model: User,
          attributes: ["id", "name", "lastname", "imgurl"],
          as: "customer",
        },
        {
          model: Store,
          as: "store",
          attributes: [
            "id",
            "name",
            "phone",
            "latitud",
            "longitud",
            "direction",
          ],
        },
        {
          model: OrderProducts,
          as: "orderproduct",
          attributes: [
            "id",
            "price",
            "quantity",
            "name",
            "unit_measurement",
            "category_name",
          ],
        },
        {
          model: InfoSend,
          as: "infosend",
        },
      ],
      attributes: [
        "id",
        "date",
        "amount",
        "state",
        "num_order",
        "paymentType",
        "paid",
        "delivery",
        "storeId",
        "createdAt",
      ],
      order: [["date", "DESC"]],
    });

    return order;
  }

  async get(type, id, state) {
    console.log(type, state);
    let condition = {};
    if (type === "store") condition = { storeId: { [Op.eq]: id } };
    if (type === "customer") {
      condition = { "$customer.id$": { [Op.eq]: id } };
    }
    if (type === "order") condition = { id: { [Op.eq]: id } };
    if (state) condition.state = state;

    const order = await this.findAll(condition);
    return order;
  }

  async countandsum(storeId) {
    const statistics = await Order.findAll({
      where: { storeId },
      attributes: [
        [sequelize.fn("count", conn.col("id")), "count"],
        [sequelize.fn("sum", conn.col("amount")), "amount"],
      ],
    });
    return statistics;
  }

  async findOne(id) {
    const order = await this.findAll({ id });
    return order[0];
  }
  async changeState(id, change) {
    const order = await Order.update(change, {
      where: {
        id: id,
      },
    });
    return order;
  }
}

module.exports = OrderService;
