const express = require('express')
const {connectToDb} = require('./connection.js')
const authRoutes = require('./routes/AuthRoutes.js')
require('dotenv').config()
const app = express();

console.clear()

connectToDb(process.env.DB_URL)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/auth', authRoutes )



app.listen(process.env.PORT, () => console.log("server started"))

