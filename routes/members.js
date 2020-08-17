const express = require('express')
const membersRouter = express.Router()

//Get home page
membersRouter.get('/home',(req,res)=>{
    res.render('home_page',{title:'Home Page'})
})


//Get request for sign up page
membersRouter.get('/signup',(req,res)=>{
    res.render('sign_up',{title:'Sign Up'})
})

module.exports = membersRouter