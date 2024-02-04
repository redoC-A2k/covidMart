const express = require("express");
const logger = require("../services/logger")
const router = express.Router();
const Razorpay = require("razorpay");
const User = require("../models/userModel");
require('dotenv').config() 

router.post("/order", (req, res) => {
  const { amount } = req.body;
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  let options = {
    amount: amount,
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    logger.debug(order);
    res.json(order);
  });
});

router.post("/payment", (req, res) => {
  const {
    userId,
    razorpay_signature,
    razorpay_order_id,
    razorpay_payment_id,
  } = req.body;
  if (
    razorpay_signature !== undefined &&
    razorpay_payment_id !== undefined &&
    razorpay_order_id !== undefined
  ) {
    new Promise((resolve, rej) => {
      User.findById(userId, (err, savedUser) => {
        if (err) {
        logger.warn("some error in /payment in order.js", err);
        resolve()
        }
        else {
          savedUser.cart = [];
          savedUser.save();
          resolve();
        }
      });
    }).then(() => {
      res.json({ message: "ok" });
    });
  } else {
    res.json({ message: "some error in payment" });
  }
});

module.exports = router;
