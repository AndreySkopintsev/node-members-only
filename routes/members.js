const express = require('express')
const membersRouter = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

//Get home page
membersRouter.get('/home',(req,res)=>{
    res.render('home_page',{title:'Home Page'})
})


//Get request for sign up page
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
            status:true
        })
        user.save(err => {
            if(err){return next(err)}

        })
        res.redirect('/membersOnly/home')
    })
})

module.exports = membersRouter