const boom = require('@hapi/boom');
const models = require('./../db/models/index')
const { newStore_ALG, storeAround_ALG, deleteObject_ALG } = require("../libs/algolia.js");
const {Store} = models

const UserService = require('./user.service')
const userService = new UserService();

class StoreService {
    constructor(){}

    async getStoreAround(query) {
      const {latitud, longitud} = query

      const resStore = await storeAround_ALG(latitud, longitud);
      const allStores =
      resStore.length > 0
        ? resStore?.map((e) => {
            const { id, name, imgurl, direction, phone, _geoloc } = e;
            return { id, name, imgurl, direction, phone, latitud: _geoloc.lat, longitud: _geoloc.lng};
          })
        : [];
    
    return allStores;
    }

    async create(data) {
        const {nameStore, latitud, longitud, direction, phone, ...userData} = data
        const { user } = await userService.register(userData)
      console.log(user.id)
        if(!user.id) throw boom.notFound('El usuario ya esta registrado')
        const store = await Store.create(
          {
            name: nameStore, 
            latitud, 
            longitud, 
            direction, 
            userId: user.id,
          }
        )    

        const newStore = {
            name: nameStore,
            imgurl: "",
            _geoloc: {
              lat: latitud,
              lng: longitud,
            },
            direction,
            phone,
            userId: user.id,
            id: store.id,
            objectID: store.id
          };
         //const algolia =  await newStore_ALG(newStore)
        // console.log(algolia)
        return store
    }

    async findByPk(id) {
      const store = await Store.findByPk(id)
      return store
    }

    async findOne(condition){
      const store = await Store.findOne({where: condition})
      return store
    }

    async update(id, change) {
      const model = await this.findOne(id)
      const newStore = await model.update(change)
      return newStore 
    }

    async delete(id) {
      //await deleteObject_ALG(id)
      const model = await this.findOne(id)
      await model.destroy()

      return {rta: true}
    }
}

module.exports = StoreService