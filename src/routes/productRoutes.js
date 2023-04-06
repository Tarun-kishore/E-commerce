const express = require("express");
const auth = require("./../middlewares/auth");
const router = new express.Router();
const User = require("../models/user");
const Product = require("../models/products");
const { findById } = require("../models/products");

router.get("/all", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skipIndex = (page - 1) * limit;
  try {
    const products = await Product.find().limit(limit).skip(skipIndex).exec();
    const count = await Product.countDocuments();

    const totalPages = Math.ceil(count / limit);
    res.status(200).send({ products, totalPages });
  } catch (e) {
    res.status(404).send(e);
  }
});

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

router.put("/updateProduct", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (!product) return res.status(404).send("No such Product exist");
    if (!product.createdBy.equals(req.user._id))
      return res.status(403).send("Unauthorised Account");

    const props = ["name", "price", "image", "description"];

    props.forEach((prop) => {
      product[prop] = req.body[prop];
    });

    await product.save();

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.delete("/deleteProduct", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) return res.status(404).send("No such Product exist");
    if (!product.createdBy.equals(req.user._id))
      return res.status(403).send("Unauthorised Account");

    await product.remove();

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/cart", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skipIndex = (page - 1) * limit;
  try {
    const products = await Product.find({ _id: { $in: req.body.cart } })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    const count = await Product.countDocuments({ _id: { $in: req.body.cart } });

    const totalPages = Math.ceil(count / limit);
    res.status(200).send({ products, totalPages });
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
