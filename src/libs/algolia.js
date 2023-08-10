const algoliasearch = require("algoliasearch");
require("dotenv").config();

const { ALGOLIA_API_KEY, ALGOLIA_NAME_APP} = process.env;

const client = algoliasearch("164IVI6O9S", ALGOLIA_API_KEY);

const store_algolia = client.initIndex(ALGOLIA_NAME_APP);

const newStore_ALG = async (record) => {
  try {
    const newStore = await store_algolia.saveObject(record).wait();
    return newStore;
  } catch (error) {
    console.log({ algoliaError: error });
    return error;
  }
};

const storeAround_ALG = async (lat, lng) => {
  console.log(lng, lat);
  try {
    const { hits, ...rest } = await store_algolia.search("", {
      aroundLatLng: [lat, lng].join(","),
      aroundRadius: 1000,
    });
    return hits;
  } catch (error) {
    return error;
  }
};

const deleteObject_ALG = async (id) => {
  const object = await store_algolia.deleteObject(id)
  return object
}

module.exports = {
  newStore_ALG,
  storeAround_ALG,
  deleteObject_ALG
};
