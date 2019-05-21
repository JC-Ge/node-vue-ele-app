const express = require('express')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const app = new express()
const users = require('./router/api/users')
const profiles = require('./router/api/profiles')
const bodyParser = require('body-parser')
const passport = require('passport')

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}))  // 在新的node版本中，bodyParser的配置要写在路由配置之前
app.use(bodyParser.json())


app.use('/api/users',users)
app.use('/api/profiles',profiles)

// 链接数据库
mongoose.connect(db,{ useNewUrlParser: true })
.then(()=>{
    console.log("connected mongodb")
})
.catch((err)=>{
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!未连接成功')
    console.log(err)
})
// passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

