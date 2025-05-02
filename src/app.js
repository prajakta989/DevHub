const express = require("express");
const connectDB = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require("./models/User");
const { validateSignupData } = require("./utils/validations");
const bcrypt = require('bcryptjs')
const validator = require("validator");

const app = express();
app.use("/admin", adminAuth);
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate req.body data
    validateSignupData(req);

    const {firstName, lastName, emailId, password} = req.body
    //hash password
    const passwordHash = await bcrypt.hash(password, 10)
    //creates new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    });
    //put it in try catch block whenever interacting with database
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

app.post("/login", async(req,res) =>{
  const{emailId, password} = req.body
  try{
    if(!emailId){
      throw new Error("Email is required")
    }

    if(!validator.isEmail(emailId)){
      throw new Error("Invalid Email Id")
    }
    const user = await User.findOne({emailId: emailId})

    if(!user){
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(isPasswordValid){
      res.send("User Logged in Successfully!!")
    }
    else{
      throw new Error("Invalid Credentials")
    }
  }
  catch(err){
    res.status(404).send("ERROR: " + err.message);
  }
})

//api to get a user
app.get("/user", async (req, res) => {
  const user = req.body.emailId;

  try {
    const response = await User.findOne({ emailId: user });
    if (!response) {
      res.status(404).send("User not found");
    } else {
      res.send(response);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//api to get all the user users "/feed"

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status("404").send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//get user by id
app.get("/userId", async (req, res) => {
  const userId = req.body._id;
  try {
    const response = await User.findById({ _id: userId });
    if (!response) {
      res.status(404).send("No user found for this Id");
    } else {
      res.send(response);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//delete user API

app.delete("/userId", async (req, res) => {
  const user = req.body.userId;
  try {
    const response = await User.findByIdAndDelete(user);
    // const response = await User.findByIdAndDelete({_id:user}) //same as above one
    console.log(response);

    res.send("user Deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// update user API
app.patch("/user/:userid", async (req, res) => {
  const userId = req.params?.userid;
  const data = req.body;
  try {
    const allowed_updates = ["skills", "about", "photoUrl", "gender", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowed_updates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }

    if (data.skills?.length > 10)
      throw new Error("Skills cannot be more than 10");

    const response = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User data updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connection successfully established...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("database connection disrupted");
  });
