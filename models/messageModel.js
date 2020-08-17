const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MessageSchema = new Schema({
    text:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    date:{type:Date}
})

module.exports = mongoose.model('Message',MessageSchema)