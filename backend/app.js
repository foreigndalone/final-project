const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const userRouter = require('./routes/userRouter.js')

const app = express()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())

app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})


