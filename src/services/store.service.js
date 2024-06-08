const boom = require("@hapi/boom");
const models = require("./../db/models/index");
const {
  newStore_ALG,
  storeAround_ALG,
  deleteObject_ALG,
} = require("../libs/algolia.js");
const { Store } = models;

const UserService = require("./user.service");
const userService = new UserService();

class StoreService {
  constructor() {}

  async getStoreAround(query) {
    const { latitud, longitud } = query;

    const resStore = await storeAround_ALG(latitud, longitud);
    const idStores = resStore.length > 0 ? resStore?.map((e) => e.id) : [];
    console.log("idStores: ", idStores);
    const stores =
      idStores.length > 0
        ? await Store.findAll({ where: { id: idStores } })
        : [];

    return stores;
  }

  async create(data) {
    const { nameStore, latitud, longitud, direction, phone, ...userData } =
      data;
    const user = await userService.register(userData);

    if (!user.id) throw boom.notFound("El usuario ya esta registrado");
    const store = await Store.create({
      name: nameStore,
      latitud,
      longitud,
      direction,
      userId: user.id,
    });

    const newStore = {
      _geoloc: {
        lat: latitud,
        lng: longitud,
      },
      userId: user.id,
      id: store.id,
      objectID: store.id,
    };
    const algolia = await newStore_ALG(newStore);
    console.log(algolia, "algolia");
    return store;
  }

  async findByPk(id) {
    const store = await Store.findByPk(id);
    return store;
  }

  async findOne(condition) {
    const store = await Store.findOne({ where: condition });
    return store;
  }

  async update(id, change) {
    const model = await this.findOne(id);
    const newStore = await model.update(change);
    return newStore;
  }

  async delete(id) {
    //await deleteObject_ALG(id)
    const model = await this.findOne(id);
    await model.destroy();

    return { rta: true };
  }
}

module.exports = StoreService;
