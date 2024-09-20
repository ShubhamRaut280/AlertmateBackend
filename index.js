const express = require('express')
const { connectToDb } = require('./connection.js')
const authRoutes = require('./routes/AuthRoutes.js')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
require('dotenv').config()
const app = express();

console.clear()

connectToDb(process.env.DB_URL)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/auth', authRoutes)

app.get('/locations', async (req, res) => {
    const token = req.header('Authorization')
    if (!token)
        res.status(401).json({ 'msg': 'User not authenticated' })

    console.log("token received : ", token)

    try{
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)

    console.log('decoded id : ', decode)

    // const user = await User.findOne({ _id: decode })
    // console.log("User is : ", user)
    }catch(err){
        console.log(err)
        res.status(400).json({"msg" : "something went wrong", 'error' : err})
    }
})



app.listen(process.env.PORT, () => console.log("server started"))

