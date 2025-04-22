const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3, 
        maxLength: 255, 
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String, 
        required:true,
        unique : true, 
        lowercase: true, 
        trim: true, 
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        min:18,
        max: 50
    },
    gender:{
        type:String,
    },
    photoUrl:{
        type: String
    },
    about:{
        type: String,
        default: "This is default about information about the user"
    },
    skills:{
        type: [String]
    },
    // location:{
    //     type: String,
    //     minLength: 20,
    //     maxLength: 255
    // },
    // phoneNumber:{
    //     type: String,
    //     minLength: 10,
    //     maxLength: 15
    // }
})

const User = mongoose.model("User", userSchema)
module.exports = User
