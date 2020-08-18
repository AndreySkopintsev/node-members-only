require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const mongoose = require('mongoose')
const homeRouter = require('./routes/home')
const membersRouter = require('./routes/members')

const mongoUrl = process.env.mongoUrl

mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res => {
    console.log('connected to mongoDB')
})
.catch(error => {
    console.log('error connecting to mongoDB: ',error.message)
})
const db = mongoose.connection
db.on('error',console.error.bind(console,"mongo connection error"))


app.set('views','./views')
app.set('view engine','pug')

app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: process.env.session, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',homeRouter)
app.use('/membersOnly',membersRouter)

module.exports = app