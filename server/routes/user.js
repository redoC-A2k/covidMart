const express = require("express");
const logger = require("../services/logger")
const router = express.Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");

router.post("/getUserdata", (req, res) => {
  const { userId } = req.body;
  User.findById(userId, (err, savedUser) => {
    if (err) {
      logger.error("some error happened in cart.js in getCart");
    } else {
      res.json({ userdata: savedUser });
    }
  });
});

router.post("/giveRatingAndGetUserdata", (req, res) => {
  const { userId, productId, value } = req.body;
  logger.debug(userId, productId, value);
  let myRatingFound = false;
  User.findById(userId, (err, savedUser) => {
    if (err) {
      logger.error("error in giveRatingAndGetUserdata in User.findById");
    } else {
      new Promise((resolve, rej) => {
        let arrayLength = savedUser.myRatings.length;
        savedUser.myRatings = savedUser.myRatings.map((eachRating, ind) => {
          if (eachRating.productId === productId) {
            myRatingFound = true;
            eachRating.value = value;
            if (ind === arrayLength - 1) {
              resolve();
            }
            return eachRating;
          } else if (ind === arrayLength - 1) {
            resolve();
            return eachRating;
          } else return eachRating;
        });
      })
        .then(() => {
          if (myRatingFound === false) {
            savedUser.myRatings.push({
              productId: productId,
              value: value,
            });
            savedUser.save();
            Product.findById(productId, (err, savedProduct) => {
              if (err)
                logger.error(
                  "error in giveRatingAndGetUserdata in user.js in Product.findById",
                  err
                );
              else {
                savedProduct.rating.push({
                  userId: userId,
                  value: value,
                });
                savedProduct.save();
                res.json({ userdata: savedUser, product: savedProduct });
              }
            });
          } else if (myRatingFound === true) {
            Product.findById(productId, (err, savedProduct) => {
              if (err) {
                logger.error("error in else if in then() in user.js");
              } else {
                savedProduct.rating.map((eachRating) => {
                  if (eachRating.userId === userId) {
                    eachRating.value = value;
                    return eachRating;
                  } else return eachRating;
                });
                savedProduct.save();
                savedUser.save()
                res.json({ userdata: savedUser, product: savedProduct });
              }
            });
          }
        })
        .catch((err) => {
          logger.error("error in promise in user.js", err);
        });
    }
  });
});

module.exports = router;
