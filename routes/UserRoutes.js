const express = require('express')
const profileRoutes = express.Router()
const {createUserProfile} = require('../controllers/UserControllers.js')


profileRoutes.post('/create', createUserProfile)


module.exports = profileRoutes