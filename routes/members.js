require('dotenv').config()
const express = require('express')
const membersRouter = express.Router()
const User = require('../models/userModel')
const Message = require('../models/messageModel')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


//PASSPORT FUNCTIONS

//LocalStrategy
passport.use(
    new LocalStrategy((username,password,done)=>{
        User.findOne({username:username},(err,user)=>{
            if(err){return done(err)}
            if(!user){
                return done(null,false,{msg:'Incorrect email'})
            }
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    return done(null,user)
                }else{
                    return done(null,false<{msg:'Incorrect password'})
                }
                
            })
        })
        
    })
)

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
})

//GET home page
membersRouter.get('/home',(req,res)=>{
    Message.find()
    .populate('user')
    .exec(function(err,messages){
        if(err){return next(err)}
        res.render('home_page',{title:'Home Page',user:req.user,messages:messages})
    })
})


//GET request for sign up page
membersRouter.get('/signup',(req,res)=>{
    res.render('sign_up',{title:'Sign Up'})
})

//POST request for sign up page
membersRouter.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hashedPassword)=>{
        if(err){return next(err)}
        const user = new User({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            username:req.body.username,
            password:hashedPassword,
            status:false,
            admin:false
        })
        user.save(err => {
            if(err){return next(err)}

        })
        res.redirect('/membersOnly/home')
    })
})

//GET log in page
membersRouter.get('/login',(req,res)=>{
    res.render('log_in',{title:'Log in'})
})

//POST request
membersRouter.post('/login',passport.authenticate('local',{
    successRedirect:'/membersOnly/home',
    failureRedirect:'/membersOnly/login'
}))

//GET new message form
membersRouter.get('/newMessage/:id',(req,res)=>{
    User.findById(req.params.id)
    .exec(function(err,user){
        if(err){return next(err)}
        res.render('new_message',{title:'New message',user:user})
    })
    
})

//POST request new mesage form
membersRouter.post('/newMessage/:id',(req,res)=>{
    let message = new Message({
        title:req.body.title,
        text:req.body.text,
        user:req.params.id,
        date: new Date()
    })

    message.save(err => {
        if(err){return next(err)}
        
    })
    res.redirect('/membersOnly/home')
})

//GET request become a member page
membersRouter.get('/becomeMember/:id',(req,res)=>{
    User.findById(req.params.id)
    .exec((err,user)=>{
        if(err){return next(err)}
        res.render('become_member.pug',{title:'Become a member',user:user})
    })

})

//POST request to become a member page
membersRouter.post('/becomeMember/:id',(req,res)=>{
    if(req.body.secret === process.env.secretMember){
        User.findByIdAndUpdate(req.params.id,{status:true})
        .exec((err,result)=>{
            if(err){return next(err)}
            console.log(result)
            res.redirect('/membersOnly/home')
        })
    }else{
        console.log('wrong secret word')
        res.redirect('/membersOnly/home')
    }
})

//GET request to become admin page
membersRouter.get('/becomeAdmin/:id',(req,res)=>{
    User.findById(req.params.id)
    .exec((err,result)=>{
        if(err){return next(err)}
        res.render('admin_page',{title:'Become and admin',user:result})
    })
})

//POST request to become admin page
membersRouter.post('/becomeAdmin/:id',(req,res)=>{
    if(req.body.secret === process.env.secretAdmin){
        User.findByIdAndUpdate(req.params.id,{admin:true})
        .exec((err,result)=>{
            if(err){return next(err)}
            res.redirect('/membersOnly/home')
        })
    }else{
        console.log('wrong secret word')
        res.redirect('/membersOnly/home')
    }
    
})

//GET request to log out page
membersRouter.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/membersOnly/home')
})

//GET request to delete message page
membersRouter.get('/deleteMessage/:id',(req,res)=>{
    res.render('delete_page',{title:'Delete message'})
})

//POST request to delete message page


module.exports = membersRouter