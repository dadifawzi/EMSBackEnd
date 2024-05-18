const mongoose = require('mongoose') ; 
const Client = mongoose.model('Client',{
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    adress:{
        type:String
    },
    tel:{
        type:String
    },
    image:{
        type:String
    },
    distance:{
        type:String 
    },
    date:{
        type:String
    },
    deleted:{
        type:Boolean , default : false
    } 


})

module.exports = Client ;
