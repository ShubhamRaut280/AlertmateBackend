const express = require('express')
const profileRoutes = express.Router()
const {createUserProfile , updateUserProfile, addFamilyMember} = require('../controllers/UserControllers.js')


profileRoutes.post('/create', createUserProfile)
            .patch('/update', updateUserProfile)
            .patch('/addMember', addFamilyMember)


module.exports = profileRoutes