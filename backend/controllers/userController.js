const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const signUpUser = async(req, res) => {
    const {email, username, password} = req.body
    
    try{
        const isExist = await userModel.getUserByMail(email)
        if(isExist){
            return res.status(409).json({ message: "User already exists" })
        }
        const user = await userModel.createUser(email, username, password)

        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        console.log()

        // ------- УСТАНАВЛИВАЕМ КУКУ -------
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 день
        });
        return res.status(201).json({
            message: 'User registrated successfuly',
            user
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'internal server error'})
    }
}



const loginUpUser = async(req, res) => {
    const {username, password} = req.body
    try{
        const user = await userModel.getUserByName(username)
        if(!user){
            return res.status(401).json({ message: "Wrong password or email" })
        }
        const match = await bcrypt.compare(password, user.password)
          if (!match) {
            return res.status(401).json({ message: "Wrong password" });
        }
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
        const accessToken = jwt.sign(
            {userId: user.id, username: user.username},
            ACCESS_TOKEN_SECRET,
            {expiresIn: "1d"}
        )
        res.cookie('token', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(200).json({
            message: 'Login successfuly',
            user: {userId: user.id, username: user.username, userStatus: 'active'},
            token: accessToken
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "server error" });
    }
}
module.exports = {signUpUser, loginUpUser}