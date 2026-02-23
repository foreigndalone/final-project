const {db} = require('../config/db.js')
const bcrypt = require('bcrypt')

module.exports = {
    createUser: async(email, username, password)=>{
        const trx = await db.transaction()
        try{
            const hashPassword = await bcrypt.hash(password + '', 10)
            const [user] = await trx('users').insert({
                email: email.toLowerCase(),
                username: username.toLowerCase(),
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
            const user = await db('users')
            .select("id", "username", "password_hash")
            .where({username: username})
            .first();
            return user
        }catch(err){
            console.log(err)
            throw err
        }
    },

    getUserByMail: async (email) => {
        try {
        const user = await db('users')
            .select("id", "email", "password_hash")
            .where({ email: email.toLowerCase() })
            .first();
        return user;
        } catch (err) {
        console.log(err);
        throw err;
        }
    },
    addUsersData: async (id, data) => {
    try {
        const updateData = { ...data };

        // если есть пароль — хэшируем
        if (updateData.password) {
        const hash = await bcrypt.hash(updateData.password, 10);
        updateData.password_hash = hash;
        delete updateData.password;
        }
        

        const [updatedUser] = await db("users")
        .where({ id }) // используем id
        .update(updateData)
        .returning(["id", "email", "username"]); // name нет, только username

        return updatedUser;
    } catch (err) {
        console.log("addUsersData error:", err);
        throw err;
    }
    },
}