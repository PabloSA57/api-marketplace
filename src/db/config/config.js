const config = require("../../config/index.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const DATABASE_URL_DEV = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const DATABASE_URL_PRODU = `${config.dbUrl}`;

module.exports = {
  development: {
    url: DATABASE_URL_DEV,
    dialect: "postgres",
  },
  test: {
    url: DATABASE_URL_DEV,
    dialect: "postgres",
  },
  production: {
    url: DATABASE_URL_PRODU,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Importante si usas conexiones SSL sin un certificado firmado por una entidad de certificación.
      },
    },
  },
};
