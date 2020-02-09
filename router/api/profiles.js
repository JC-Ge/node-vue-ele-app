const Profile = require('../../models/Profile')
const express = require('express')
const passport = require('passport')
const router = express.Router()


// @route Post /api/profiles/add
// @desc 创建信息接口
// @access Private
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res) => {  // 私有接口，需要验证
    const profileFields = {}
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile => {
        res.send(profile)
    })
})

// @route Post /api/profiles
// @desc 获取所有信息
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {    // 
    Profile.find()
            .then(profiles => {
                if(!profiles)
                   return res.status(404).json('没有人很内容')
                res.json(profiles)
            })
            .catch(err => res.json(404).json(err))
})

// @route Post /api/profiles/:id
// @desc 获取单个信息
// @access Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {  
    Profile.findOne({_id:req.params.id})
            .then(profile => {
                if(!profile)
                   return res.status(404).json('没有内容')
                res.json(profile)
            })
            .catch(err => res.json(404).json(err))
})

// @route Post /api/profiles/edit
// @desc 编辑信息接口
// @access Private
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) => {  
    const profileFields = {}
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},  // 更新
        {new:true}
    ).then(profile => res.json(profile))
})

// @route Delete /api/profiles/delete
// @desc 删除信息接口
// @access Private
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOneAndRemove({_id:req.params.id})
        .then(profile => {
            res.json(profile);
        })
        .catch(err => {
            console.log(err)
            res.status(404).json("删除失败")
        })
})

module.exports = router