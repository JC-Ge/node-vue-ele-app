const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false)

const ProfielSchema = new Schema({
    type:{
        type:String
    },
    description:{
        type:String
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true,
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    type:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports  = Profile = mongoose.model('profile',ProfielSchema)