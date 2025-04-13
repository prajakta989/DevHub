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


connectDB().then(() => {
  console.log("database connection successfully established...");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch((err) => {
  console.log("database connection disrupted");
})

