const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const requireLogin = require("../middleware/requireLogin");

router.post("/product", (req, res) => {
  let { _id } = req.body;
  console.log(_id);
  Product.findById(_id, (err, product) => {
    if (err) {
      console.log(err);
    } else {
      res.json(product);
    }
  });
});

module.exports = router;
