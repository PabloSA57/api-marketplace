const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const models = require('../db/models')

const {User} = models

class UserService {
    constructor(){}

    async find(email){
         const user = await User.findOne({
                where: { email: email },
                attributes: ["id", "name", "lastname", "email", "password", "role"],
              });
    
              return user
       
    }

    async register(data) {
        try {
            
            const password = bcrypt.hashSync(data.password, Number.parseInt(10))
            const user = await User.create({...data, password})
            return {rta: 'Se creo correctamente', id: user.id}
        } catch (error) {
            console.log(error.statusCode)
            return error
        }
        }
    

    async login(data) {
        const user = await this.find(data.email)

        bcrypt.compareSync(data.password, user.password)
        let token = jwt.sign({ userId: user.id, role: user.role }, "pepe", {
            expiresIn: "24h",
          });
        return {token, role: user.role}
    }

    async delete(email) {
        const user = await User.findOne({where: {email: email}});
        await user.destroy();
        return user;
    }
}

module.exports = UserService