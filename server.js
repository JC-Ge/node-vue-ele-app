const express = require('express')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const app = new express()
const users = require('./router/api/users')


const port = process.env.PORT || 5000
app.use('/api/users',users)

app.get('/',(req,res)=>{
    mongoose.connect(db,{ useNewUrlParser: true })
    .then(()=>{
        console.log("connected mongodb")
        res.send('hello')
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})