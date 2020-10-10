const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const requireLogin = require("../middleware/requireLogin");

router.post("/product", requireLogin, (req, res) => {
  let { _id } = req.body;
  Product.findById(_id, (err, product) => {
    if (err) {
      console.log("error in /product in product.js", err);
    } else {
      res.json({product:product});
    }
  });
});

router.post("/rating", (req, res) => {
  let { productId, userId, value } = req.body;
  console.log(productId, userId, value);
  Product.findById(productId, (err, product) => {
    if (err) {
      console.log("error in /rating in product.js", err);
    } else {
      if (product.rating.length !== 0) {
        let userIdFound = false;
        new Promise((resolve, rej) => {
          let ratingArrayLength = product.rating.length;
          product.rating = product.rating.map((eachrating, ind) => {
            if (eachrating.userId === userId) {
              userIdFound = true;
              eachrating.value = value;
              if (ind === ratingArrayLength - 1) {
                console.log(product);
                resolve();
              }
              return eachrating;
            } else if (ind === ratingArrayLength - 1) {
              console.log(product);
              resolve();
            } else return eachrating;
          });
        }).then(() => {
          if (userIdFound === false) {
            product.rating.push({
              userId: userId,
              value: value,
            });
            product.save();
            res.json(product);
          } else {
            product.save();
            res.json(product);
          }
        });
      } else {
        product.rating.push({
          userId: userId,
          value: value,
        });
        res.json(product);
        product.save();
      }
    }
  });
});
module.exports = router;
