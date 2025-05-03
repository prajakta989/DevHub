const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const { user } = req;
  res.send(`Connection req sent by ${user.firstName}`);
});

module.exports = requestRouter;
