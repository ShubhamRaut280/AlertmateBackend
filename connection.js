const mongoose = require('mongoose')

await function connectToDb(url){
    try{
        mongoose.connect(url).then(console.log("db connected"))
    }catch(err){
        console.log("unable to connect to db : ", err)
    }
}

module.exports = {connectToDb}