const boom = require("@hapi/boom");
const models = require("./../db/models/index");
const { Store } = models;

const checkRole = (...roles) => {
  return async (req, res, next) => {
    const user = req._user;
    if (roles.includes(user.role)) {
      if (user.role === "seller") {
        try {
          //  console.log("rolesuser", user.userId);
          const store = await Store.findOne({
            where: { userId: user.userId },
          });
          console.log("role", store.id);
          if (store.length < 1 || !store.id) {
            next(boom.unauthorized());
            return;
          }
          req._storeId = store.id;
          next();
          return;
        } catch (error) {
          next(boom.unauthorized());
        }
      } else {
        next();
        return;
      }
    } else {
      next(boom.unauthorized());
    }
  };
};

module.exports = checkRole;
