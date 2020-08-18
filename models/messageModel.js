const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

let MessageSchema = new Schema({
    title:{type:String,required:true},
    text:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    date:{type:Date}
})

MessageSchema
.virtual('prettydate')
.get(function(){
    return moment(this.date).format('MMMM Do, YYYY')
})

module.exports = mongoose.model('Message',MessageSchema)