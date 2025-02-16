 const adminAuth = (req,res,next) =>{
    console.log("authorization middleware executed");
    
    let token = 'xyz';
    let isAuthorizedToken = token === 'xyz';
    if(!isAuthorizedToken){
      res.status(401).send("Unauthorised!")
    }
    else{
      // res.send("/admin handled")
      next()
    }
}


const userAuth = (req,res,next) =>{
    console.log("User authorization middleware executed");
    
    let token = 'xyz';
    let isAuthorizedToken = token === 'xyz';
    if(!isAuthorizedToken){
      res.status(401).send("Unauthorised!")
    }
    else{
      // res.send("/admin handled")
      next()
    }
}

module.exports = {adminAuth, userAuth}