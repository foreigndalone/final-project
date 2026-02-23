const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const signUpUser = async(req, res) => {
    console.log('signup')
    const { username, email, password} = req.body
    
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

        // ------- УСТАНАВЛИВАЕМ КУКУ -------
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 день
        });
        return res.status(201).json({
        message: 'User registrated successfuly',
        user: { id: user.id, username: user.username, email: user.email }, // id нужен
        token
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'internal server error'})
    }
}



const loginUpUser = async(req, res) => {
    console.log('login')
    const {username, password} = req.body


    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    
    try{
        const user = await userModel.getUserByName(username)
        if(!user){
            return res.status(401).json({ message: "Wrong password or email" })
        }
        const match = await bcrypt.compare(password, user.password_hash)
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
        console.log(password)
        console.log(user.password_hash)
        console.log("REQ BODY:", req.body)
        console.log("FOUND USER:", user)

        return res.status(200).json({
        message: 'Login successfuly',
        user: { id: user.id, username: user.username, email: user.email }, // обязательно id
        token: accessToken
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "server error" });
    }
}

const updateUser = async (req, res) => {
  try {
    const { id, ...data } = req.body; // берём id из тела запроса
    if (!id) return res.status(400).json({ message: "User ID required" });

    const updated = await userModel.addUsersData(id, data);

    return res.status(200).json({
      message: "User updated",
      user: updated
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
};
module.exports = {signUpUser, loginUpUser, updateUser}