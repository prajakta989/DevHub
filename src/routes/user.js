const express= require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router()

userRouter.get("/user/request/received", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user._id;

        const userRequests = await ConnectionRequest.find({
            toUserId: loggedInUser,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"])

        res.json({
            message: "user requests fetched successfully !",
            data:userRequests
        })
    }
    catch(err){
        res.status(400).send("Error:" + err.message)
    }
})

module.exports = userRouter