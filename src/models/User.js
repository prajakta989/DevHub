const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    firtsName: {
        type: String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }

})

const User = mongoose.model("User", userSchema)
module.exports = User
