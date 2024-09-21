const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    name : { type : String,  },
    email : {type : String , unique : true, required : true},
    phone : {type : Number , },
    image_url : {type : String ,},
    emergency : {type : Boolean, default : false },
    family_members : { type : [String], default : [] }
})

const UserProfile = new mongoose.model(profile)

module.exports = {UserProfile}