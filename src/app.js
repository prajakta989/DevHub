const express = require('express')

const app = express();

 
app.use("/user", (req,res) => {
    res.send("Hahahahahhaha")
})
app.get("/user", (req,res) => {
    res.send({firstname:"Prajakta", lastname:"Naik Mule"})
})

app.post("/user", (req,res)=> {
    res.send("Registered user successfully!")
})
app.delete("/user", (req,res) => {
    res.send("Deleted user successfully!")
})


app.use("/test",(req,res) =>{
    res.send("hello from test")
})

app.use("/",(req,res) =>{          //kind of wild card route
    res.send("hello from server")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})