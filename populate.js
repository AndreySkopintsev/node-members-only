const User = require('./models/userModel')
const Message = require('./models/messageModel')
const mongoUrl = 'mongodb+srv://andrew:andrew123@my-database-vydwb.mongodb.net/user_authentication?retryWrites=true&w=majority'
const mongoose = require('mongoose')

mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function newUSer(name,last,username,password,status){
    let user = new User({
        firstName:name,
        lastName:last,
        username:username,
        password:password,
        status:status
    })

    user.save(function(err){
        if(err){return next(err)}
        mongoose.connection.close()
    })
}

let user = User.findOne({'name':'Andrew'})



// newUSer('Andrew','Skopintsev','andy','andy123',true)

function newMessage(text,user){
    let message = new Message({
        text:text,
        user:user
    })

    message.save(function(err){
        if(err){console.log(err)}
        mongoose.connection.close()
    })
}

Message.findById('5f394b52dbe5ad045810a565')
.populate('user')
.exec(function(err,message){
    if(err){return next(err)}
    console.log(message.user.fullName)
    mongoose.connection.close()
})

