const express = require("express");
const router = new express.Router();
const auth = require("./../middlewares/auth");
const User = require("../models/user");

router.post("/add", auth, async (req, res) => {
  try {
    console.log("route called");
    let user = await User.findOne({ email: req.userData.email });

    console.log(req.userData);
    if (!user) user = new User(req.userData);
    user.name = req.userData.name;
    user.uid = req.userData.uid;
    console.log(user);

    await user.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
