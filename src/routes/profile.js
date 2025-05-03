const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  const { token } = req.cookies;
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
