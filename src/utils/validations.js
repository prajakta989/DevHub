const validator = require('validator')

const validateSignupData = (req) => {
    const {firstName, lastName,emailId, password }  = req.body
    if(!firstName || !lastName){
        throw new Error("User Name is required")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Id")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 8 characters long and include uppercase, number, and special character.")
    }
}

module.exports = {validateSignupData}