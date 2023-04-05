const express = require("express");
const router = new express.Router();
const auth = require("./../middlewares/auth");
const User = require("../models/user");
const Product = require("../models/products");

router.post("/addProduct", auth, async (req, res) => {
  try {
    const product = new Product({ ...req.body, createdBy: req.user._id });
    await product.save();

    console.log(req.body.name, "added ");
    res.status(201).send("product added");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/myProducts", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skipIndex = (page - 1) * limit;
  try {
    const products = await Product.find({ createdBy: req.user._id })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    const count = await Product.countDocuments();

    const totalPages = Math.ceil(count / limit);
    res.status(200).send({ products, totalPages });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.userData.email });

    if (!user) user = new User(req.userData);
    user.name = req.userData.name;
    user.uid = req.userData.uid;

    await user.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
