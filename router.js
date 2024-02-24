//this file stores various routes that we use across the application
var express = require("express")
var router = express.Router()

//credentials for server side validation to work
const credential = {
    email:"alfred@gmail.com",
    password:"admin@123"
}


function isLoggedIn(req,res,next)
{
    if(req.session&&req.session.user)
    {
        return next()
    }
    res.redirect('/')
}
//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password)
    {
 req.session.user=req.body.email;
// res.end("Login Successful")
 res.redirect('/route/dashboard')
    }else{
        res.end("<h1>Invalid Username<h1>")
    }
    })

    //route for dashboard
    router.get('/dashboard',isLoggedIn,(req,res)=>{
        if(req.session.user){
            res.render('dashboard',{user:req.session.user})
    }else
    {
        res.send("unauthorised user")
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err)
        {
            console.log(err)
            res.send("Error")
        }
        else{
            res.redirect('/')//'base',{title:"Express",logout:"Logout Successfully...!"}
        }

    })
})
    module.exports=router
