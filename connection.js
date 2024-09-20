const mongoose = require('mongoose')

async function connectToDb(url){
    try{
        await mongoose.connect(url).then(console.log("db connected"))
    }catch(err){
        console.log("unable to connect to db : ", err)
    }
}


module.exports = {connectToDb}