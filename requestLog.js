const mongoose = require('mongoose')

const requestLogSchema = new mongoose.Schema({
    fecha:String,
    searchMovie:String
})

module.exports=mongoose.model('requestLog', requestLogSchema)