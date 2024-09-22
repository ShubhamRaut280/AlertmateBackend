const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { UserProfile } = require('../models/UserProfile')
const User = require('../models/User.js')


async function createUserProfile(req, res) {

    try {
        const authheader = req.header('Authorization')
        const token = authheader.substring(7)
        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!verified)
            return res.status(401).json({ 'msg': 'Not authorized' })

        const { email, name, phone, image_url, emergency, family_members } = req.body
        if (!email)
            return res.status(400).json({ 'msg': "Email cannot be empty" })

        const user = await User.findOne({ email })

        if (!user)
            return res.status(404).json({ 'msg': `User dosen't exist` })


        const userprofile = await UserProfile.findOne({ email })
        if (userprofile)
            return res.status(400).json({ 'msg': `User's profile already exist, please user update api for updating the profile` })

        const profile = new UserProfile({
            email, name: name, phone: phone, image_url: image_url, emergency: emergency, family_members: family_members
        })

        await profile.save()

        return res.status(201).json({ 'msg': 'User profile created' })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ "msg": "something went wrong", 'error': err })
    }


}

async function updateUserProfile(req, res) {
    try {
        const authheader = req.header("Authorization")
        const token = authheader.substring(7)
        if (!token)
            return res.status(401).json({ 'msg': "Not authenticated" })

        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!verified)
            return res.status(401).json({ 'msg': "Not authenticated" })


        const { email, name, phone, image_url, emergency } = req.body

        UserProfile.updateOne({ email: email }, {
            $set: {
                name: name,
                phone: phone,
                image_url: image_url,
                emergency: emergency,
            }
        }).then(result => {
            return res.status(200).json({ 'msg': `User details updated`, "result": result })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ 'msg': `Unable to udpate details`, 'error': err })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ 'msg': "something went wrong", 'error': err })
    }
}

async function addFamilyMember(req, res) {
    try {
        const authheader = req.header("Authorization")
        const token = authheader.substring(7)
        if (!token)
            return res.status(401).json({ 'msg': "Not authenticated" })

        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!verified)
            return res.status(401).json({ 'msg': "Not authenticated" })


        const { member_email } = req.body

        const member = await UserProfile.findOne({ email: member_email })
        if (!member)
            return res.status(404).json({ "msg": 'Family member not registered' })

        const user = await User.findOne({_id : verified.userId})

        if (!user)
            return res.status(404).json({ "msg": 'user not registered' })


        const useremail = user.email

        await UserProfile.updateOne({ email : useremail }, {
             $addToSet: {
                family_members: member_email
            }
        }).then(result => { console.log(result) }).catch(err => {
            console.log(err)
            return res.status(500).json({ 'msg': `Unable to udpate details`, 'error': err })
        })

        await UserProfile.updateOne({ email: member_email }, {
            $addToSet: { family_members: useremail }
        }).then(result => {
             console.log(result) 
            return res.status(200).json({ 'msg': "Member added successfully" })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ 'msg': `Unable to udpate details`, 'error': err })
        })

        

    } catch (err) {
        console.log(err)
        return res.status(500).json({ 'msg': "something went wrong", 'error': err })
    }
}


module.exports = { createUserProfile, updateUserProfile, addFamilyMember }