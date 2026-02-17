require('dotenv').config()
const jwt = require('jsonwebtoken')


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const verifyToken = async(req, res, next) =>{
    const token = req.cookies["token"]

    if(!token){
        return res.status(401).json({message: 'Unauthorized user'})
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){
            res.status(403).json({message: "Forbidden access"})
            return
        }
        req.user = decoded
        next()
    })
}
module.exports = {verifyToken,}