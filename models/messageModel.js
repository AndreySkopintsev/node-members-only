const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MessageSchema = new Schema({
    title:{type:String,required:true},
    text:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    date:{type:Date}
})

module.exports = mongoose.model('Message',MessageSchema)