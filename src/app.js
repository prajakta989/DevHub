const express = require("express");
const connectDB = require("./config/database")
const {adminAuth, userAuth} = require("./middlewares/auth")

const app = express();
app.use("/admin", adminAuth)


connectDB().then(() => {
  console.log("database connection successfully established...");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  
}).catch((err) => {
  console.log("database connection disrupted");
})

