const express = require("express");
const {adminAuth, userAuth} = require("./middlewares/auth")

const app = express();
app.use("/admin", adminAuth)

app.post("/user/login", (req,res) =>{
  res.send("user loged in successfully!")
})

app.get("/user", userAuth,(req,res) => {
  res.send("/user handled")
})

app.get("/admin/getAllData", (req,res) => {
  res.send("All data sent")
})

app.get("/admin/deleteUser", (req,res) => {
  res.send("Deleted User")
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
