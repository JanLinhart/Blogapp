const { request } = require("express")
const express = require("express")
const jwt = require('jsonwebtoken');
const User = require("../models/User")
const secretKey = process.env.SECRET_KEY;

const router = express.Router()
  

const findUser = (users,req) =>{
    var user = users.filter(user => user.password == req.body.password && user.username == req.body.username)
    return user
}

router.post("/register", async (req, res) => {
    
    const user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,

    })
    console.log(req.body)

    try {
        if(req.body.captchaValue == ''){
            res.json({response:"Invalid captcha"})
        }else if(req.body.username == ''){
            res.json({response:"Username missing"})
        }else if(req.body.password == ''){
            res.json({response:"Password missing"})
        }else if(req.body.email == ''){
            res.json({response:"Email missing"})
        }else{
            const savedUser = await user.save()
            res.json({response : savedUser})
        }
    } catch (err) {
        res.json({
            message: err
        })
    }

});

router.post("/login", async (req, res) => {
    const users = await User.find()
    console.log(req.body)
    try {
    const user = findUser(users,req)    
    if(user.length != 0 && req.body.captchaValue != ''){
        const token = await jwt.sign({ userId: user[0].id }, secretKey);
        res.json({token:token, userData:user}) 
    }else if(user.length == 0 && req.body.captchaValue == ''){
        res.json({message:"User not found & Invalid captcha"})
    }else if(user.length == 0){
        res.json({message:"User not found"})
    }else if(req.body.captchaValue == ''){
        res.json({message:"Invalid captcha"})
    }
    } catch (err) {
        res.json({
            message: err
        })
    }

});

module.exports = router