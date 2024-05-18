const mongoose = require('mongoose') ; 

const User = mongoose.model('User',{
    fullname:{
        type : String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    tel:{
        type:String
    },
    image:{
        type:String
    },
    tag:{
        type:String
    },
    date:{
        type:Date
    },
    role:{
        type:String
    },
    deleted:{
        type:Boolean , default : false
    }
})

module.exports = User ; 