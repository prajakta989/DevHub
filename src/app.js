const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const { validateSignupData } = require("./utils/validations");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "dev@hub0512", {expiresIn: "7d"});
      const cookie = res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
      });
      res.send("User Logged in Successfully!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  const { token } = req.cookies;
  try {
    const {user} = req
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});


app.post("/sendConnectionRequest", userAuth , async(req,res) =>{
  const {user}  =req
  res.send(`Connection req sent by ${user.firstName}`)
})
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
