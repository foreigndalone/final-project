const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const { generateTokens } = require('../utils/jwt.js');

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




const loginUpUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.getUserByName(username);
    if (!user) return res.status(401).json({ message: "Wrong credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Wrong credentials" });

    const { accessToken, refreshToken } = generateTokens(user);

    // refresh кладём в cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // true в production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        user: { id: user.id, username: user.username, email: user.email },
        accessToken
    });
};

const updateUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
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


const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
            { userId: decoded.userId, username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        return res.status(200).json({ accessToken: newAccessToken });
    });
};
module.exports = {signUpUser, loginUpUser, updateUser, refreshToken}