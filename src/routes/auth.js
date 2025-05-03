const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const validator = require("validator");
const { validateSignupData } = require("../utils/validations");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validate req.body data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //hash password
    const passwordHash = await bcrypt.hash(password, 10);
    //creates new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    //put it in try catch block whenever interacting with database
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!emailId) {
      throw new Error("Email is required");
    }

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email Id");
    }
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //validatePassword is a user specifis method that is why it is written under userSchema in User.js file
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //getJWT is a user specifis method thta is why it is written under userSchema in User.js file
      const token = await user.getJWT();
      const cookie = res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      });
      res.send("User Logged in Successfully!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req,res) => {
    res.cookie("token",null, {expires: new Date(Date.now())})
    res.send("Logout Successfully!!")
})

module.exports = authRouter;
