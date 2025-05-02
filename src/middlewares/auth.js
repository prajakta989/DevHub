const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async(req,res,next) =>{
  try{
    //get the token 
    //validate the token 
    //find the user using that token

    const {token} = req.cookies
    if(!token){
      throw new Error("Invalid Token")
    }
    const decodedObj = await jwt.verify(token, "dev@hub0512")

    const {_id} = decodedObj;

    const user = await User.findById({_id})
    if(!user){
      throw new Error("User does not exists")
    }

    req.user = user;
    next()
  }
  catch(err){
    res.status(400).send("Error: " + err.message)
  }
}

module.exports = {userAuth}