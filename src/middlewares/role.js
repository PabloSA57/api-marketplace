const boom = require('@hapi/boom');
const models = require('./../db/models/index')
const {Store} = models

const checkRole = (...roles) => {
    return async (req, res, next) => {
        const user = req._user
        if(roles.includes(user.role)){
            if(user.role === 'seller'){
                try {
                    const store = await Store.findAll({where: { userId: user.userId}})
                    if(store.length < 1){
                        next(boom.unauthorized())
                         return
                        }
                    req._storeId = store.id
                    next()
                    return
                } catch (error) {
                    next(boom.unauthorized())
                }

            } else {
                next()
                return
            }
            
        }else {
            next(boom.unauthorized())
        }
    }
}

module.exports = checkRole;