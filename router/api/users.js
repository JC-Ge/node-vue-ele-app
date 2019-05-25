const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json("邮箱已经存在！")
        }else{
            var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});  // s:size r:rating
            const newUser =new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
                identity:req.body.identity,
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
                            const rule = {
                                avatar:user.avatar,
                                id:user._id,
                                name:user.name,
                                identity:user.identity
                            }  // user._id\user.id都可以
                            // jwt.sign(payload, secretOrPrivateKey, [options, callback])
                            // 不提供回调函数时，将返回token字符串
                            // jwt.sign("规则","加密名字","过期时间","箭头函数")
                            jwt.sign(rule,keys.secretOrKey,{expiresIn:10},(err,token) => {    // expiresIn单位：秒
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token:'Bearer ' + token,
                                })
                            })
                        }else{
                            return res.status(400).json('密码错误')
                        }
                    })
            }
        })
})

// passport使用说明 https://blog.csdn.net/djjj123456789/article/details/81980587
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    res.json({
        name:req.user.name,
        email:req.user.email,
        id:req.user.id,
        identity:req.user.identity
    })
})
module.exports = router;