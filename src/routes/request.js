const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/User");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status

    const allowedStatus = ['interested', 'ignored'];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "Invalid status type"
      })
    }

    const toUserExists = await User.findById({_id:toUserId})
    if(!toUserExists){
      return res.status(400).json({
        message: "User does not exists"
      })
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
    })

    if(existingRequest){
      return res.status(400).json({
        message: "Connection request already exists"
      })
    }


    const request = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await request.save()
    res.json({
      message: "Connection request sent successfully !!",
      data
    })
  }
  catch(err){
    res.status(400).send("ERROR: " + err.message)
  }
  
});

module.exports = requestRouter;
