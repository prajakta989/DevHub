const express = require("express");
const connectDB = require("./config/database")
const {adminAuth, userAuth} = require("./middlewares/auth");
const User = require("./models/User");

const app = express();
app.use("/admin", adminAuth)
app.use(express.json())

app.post('/signup', async(req,res) =>{
  //creates new instance of user model
  const user = new User(req.body);
  //put it in try catch block whenever interacting with database
  try{
    await user.save()
    res.send("user created successfully")
  }
  catch(err){
    res.status(404).send("Error saving the user:"+ err.message)
  }
})

//api to get a user
app.get("/user", async(req, res) =>{
  const user = req.body.emailId;
  
  try{
    const response = await User.findOne({emailId:user})
    if(!response){
      res.status(404).send("User not found")
    }
    else{
      res.send(response)
    }
  }
  catch(err){
    res.status(404).send("Something went wrong")
  }
})


//api to get all the user users "/feed"

app.get("/feed", async(req,res) =>{
  try{
    const users = await User.find({})
    if(!users){
      res.status("404").send("No users found")
    }
    else{
      res.send(users)
    }
  }
  catch(err){
    res.status(404).send("Something went wrong")
  }
})


//get user by id
app.get("/userId", async(req,res) => {
  const userId = req.body._id
  try{
    const response = await User.findById({_id:userId})
    if(!response){
      res.status(404).send("No user found for this Id")
    }
    else{
      res.send(response)
    }
  }
  catch(err){
    res.status(404).send("Something went wrong")
  }
})


//delete user API

app.delete("/userId", async(req,res) =>{
  const user = req.body.userId
  try{
    const response = await User.findByIdAndDelete(user)
    // const response = await User.findByIdAndDelete({_id:user}) //same as above one
    console.log(response);
    
    res.send("user Deleted successfully")
  }
  catch(err){
    res.status(404).send("Something went wrong")
  }
})


connectDB().then(() => {
  console.log("database connection successfully established...");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch((err) => {
  console.log("database connection disrupted");
})

