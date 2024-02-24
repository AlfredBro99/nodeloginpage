//imports express into program
const express = require('express')
//imports the path module
const path = require('path')

//imports express session module in middleware
const session = require("express-session")
//imports uuid module and creates a secret Key for each session
const uuidv4 = require("uuid")
// importing the nocache middleware in a Node.js application to prevent caching of server responses
const nocache = require('nocache')
//importing  routes from the root folder
const router = require('./router')
//creating an instance of the express app
const app = express()

//this set the port number either from the config.env file or a default value is provided(3000)

//responsible for  parsing incoming request bodies in a middleware function before we use it
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//to setup view engine
app.set('view engine','ejs')

app.use(nocache())


//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
//using session
app.use(session({secret:'uuidv4',resave:false,saveUninitialized:true,cookie:{maxAge:90000}}))
//this middleware adds all the routes in the server
app.use('/route',router)


//home route
app.get('/', (req, res) => {
    if(req.session.user)
    {
        res.render('dashboard',{user:req.session.user})
    }
    res.render('base',{title:"Login System"})
})

//starting the server and listening to the request
app.listen(3000,()=>{console.log("hosting to the server on http://localhost:3000")})

