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


module.exports = router