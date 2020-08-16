const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:Boolean,required:true}
})

UserSchema
.virtual('fullName')
.get(function(){
    return `${firstName} ${lastName}`
})

module.exports = mongoose.model('User',UserSchema)