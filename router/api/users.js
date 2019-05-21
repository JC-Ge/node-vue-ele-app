const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

router.get('/test',(req,res)=>{
    res.json({msg:'login works'})
})

router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({email:"邮箱已经存在！"})
        }else{
            var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});  // s:size r:rating
            const newUser =new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
            })
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if(!user){
                res.json({msg:'用户不存在'})
            }else{
                bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch){
                            const rule = {id:user._id,name:user.name}  // user._id\user.id都可以
                            // jwt.sign("规则","加密名字","过期时间","箭头函数")
                            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token:'Bearer ' + token,
                                })
                            })
                        }else{
                            return res.status(400).json({password:'密码错误'})
                        }
                    })
            }
        })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    res.json({
        name:req.user.name,
        email:req.user.email,
        id:req.user.id
    })
})
module.exports = router;