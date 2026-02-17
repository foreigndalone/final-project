const {db} = require('../config/db.js')
const bcrypt = require('bcrypt')

module.exports = {
    createUser: async(email, username, password)=>{
        const trx = await db.transaction()
        try{
            const hashPassword = await bcrypt.hash(password + '', 10)
            const [user] = await trx('users').insert({
                email: email.toLowerCase(),
                username: username,
                password_hash: hashPassword
            }, ["id", "email", "username"])
            await trx.commit()
            return user
        }catch(err){
            await trx.rollback()
            console.log(err)
            throw err
        }
    },
    getUserByName: async(username)=>{
        try{
            const user = await db('users').select("id", "username", "password_hash").where({username: username.toLowerCase()}).first()
            return user
        }catch(err){
            console.log(err)
            throw err
        }
    }
}