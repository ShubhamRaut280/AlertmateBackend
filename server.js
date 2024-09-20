const express = require('express')
const {connectToDb} = require('./connection.js')
require('dotenv').config()
const app = express();


connectToDb(process.env.DB_URL)

app.use(express.urlencoded({ extended: false }))


app.listen(process.env.PORT, () => console.log("server started"))

