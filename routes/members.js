const express = require('express')
const membersRouter = express.Router()

membersRouter.get('/home',(req,res)=>{
    res.send('home page')
})

module.exports = membersRouter