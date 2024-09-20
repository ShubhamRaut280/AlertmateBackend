const express = require('express')
const {registerController, loginController} = require('../controllers/Controllers.js')
const authRoutes = express.Router()

authRoutes.post('/register', registerController)
            .post('/login', loginController)

module.exports = authRoutes

