const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res,next) => {
    
    console.log("response 1 executed")
    // res.send("response!");
    next();
  },
  (req, res,next) => {
    console.log("response 2 executed")
    // res.send("response 2");
    next()
  }, 
  (req, res,next) => {
    console.log("response 3 executed")
    // res.send("response 3");
    next()
  },
  (req, res,next) => {
    console.log("response 4 executed")
    // res.send("response 4");
    next()
  },
  (req, res, next) => {
    console.log("response 5 executed")
    // res.send("response 5");
    next()
  },
);

app.use("/test", (req, res) => {
  res.send("hello from test");
});

// app.use("/",(req,res) =>{          //kind of wild card route
//     res.send("hello from server")
// })
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
