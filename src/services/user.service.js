const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");
const models = require("../db/models");
const { passwordHash, isValidPassword } = require("../libs/bcrypt");

const { User, Customer } = models;

class UserService {
  constructor() {}

  async find(email) {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["id", "name", "lastname", "email", "password", "role"],
    });

    return user;
  }

  async register(data) {
    const isUser = await this.find(data.email);
    if (isUser) throw boom.badRequest("Usuario ya registrado");
    const password = passwordHash(data.password);
    const user = await User.create({ ...data, password });

    if (user.role === "client") {
      await Customer.create({ userId: user.id });
    }
    return user;
  }

  async login(data) {
    const user = await this.find(data.email);
    if (!user) throw boom.unauthorized("Usuario no registrado");
    const a = await isValidPassword(data.password, user.password);
    if (!a) throw boom.unauthorized("Incorrect Password");
    let token = jwt.sign({ userId: user.id, role: user.role }, "pepe", {
      expiresIn: "24h",
    });

    return { token, role: user.role, email: user.email };
  }

  async delete(email) {
    const user = await User.findOne({ where: { email: email } });
    await user.destroy();
    return user;
  }

  async findOne(id) {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "email", "name", "lastname", "role", "imgurl"],
    });
    return user;
  }
}

module.exports = UserService;
