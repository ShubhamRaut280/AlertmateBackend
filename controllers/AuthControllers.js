const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

async function registerController (req, res){
    try{
        const {email , password} =   req.body
        if(!email || !password)
            return res.status(400).json({'msg' : 'email and password are required'})

        const exists = User.findOne({email})
        if(exists.email)
           return  res.status(400).json({'msg' : 'User already exist'})


        const pass = await bcrypt.hash(password, 10)
        const user = new User({email ,password :  pass})
        await user.save()

       return res.status(201).json({'msg' : 'User successfully created'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Failed to create user', error: err });      
    }
}


async function loginController(req, res){
    try{
        const {email, password} = req.body
        if(!email || !password)
            return res.status(400).json({'msg' : 'email and password are required'})

        const user = await User.findOne({email})
        if(!user)
            return res.status(404).json({'msg' : 'User dose not exist'})

        console.log(password + " " + user.password)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
           return  res.status(401).json({'msg' : 'Incorrect password'})
        
        // generating jwt token
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn :  '240h'
        })


        return res.status(200).json({'msg' : 'Login successful', 'token' : token})

   } catch (err) {
        console.log(err)
     return res.status(500).json({ msg: 'Failed to login', error: err });      
    }
}



module.exports = {registerController, loginController}