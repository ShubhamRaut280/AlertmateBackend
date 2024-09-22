const express = require('express')
const profileRoutes = express.Router()
const {createUserProfile , updateUserProfile} = require('../controllers/UserControllers.js')


profileRoutes.post('/create', createUserProfile)
            .patch('/update', updateUserProfile)


module.exports = profileRoutes