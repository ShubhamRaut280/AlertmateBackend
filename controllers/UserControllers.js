const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {UserProfile} = require('../models/UserProfile')
const User = require('../models/User.js')


async function createUserProfile(req, res) {

    try {
        const authheader = req.header('Authorization')
        const token = authheader.substring(7)
        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!verified)
           return  res.status(401).json({ 'msg': 'Not authorized' })

        const { email, name, phone, image_url, emergency, family_members } = req.body
        if (!email)
            return res.status(400).json({ 'msg': "Email cannot be empty" })

        const user = await User.findOne({email})

        if(!user)
            return res.status(404).json({'msg' : `User dosen't exist`})

    
        const userprofile = await UserProfile.findOne({email})
        if(userprofile)
            return res.send(400).json({'msg' : `User's profile already exist, please user update api for updating the profile`})

        const profile = new UserProfile({
            email,name :  name , phone : phone,image_url:  image_url,emergency:  emergency, family_members :  family_members
        })

        await profile.save()

        return res.status(201).json({'msg' : 'User profile created'})

    } catch (err) {
        console.log(err)
        return res.status(400).json({ "msg": "something went wrong", 'error': err })
    }


}


module.exports = {createUserProfile}