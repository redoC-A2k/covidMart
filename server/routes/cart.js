const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { Promise } = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const logger = require("../services/logger")

router.post("/addToCart",requireLogin, (req, res) => {
  const { userId, productId, quantity, title, price } = req.body;
  const cartelem = {
    productId: productId,
    quantity: quantity,
    title: title,
    price: price,
  };
  User.findById(userId, (err, savedUser) => {
    if (err) logger.error("error in cart.js addToCart" + err);
    else {
      let isProductInCart = false;
      savedUser.cart.map((cartItem)=>{
        if(cartItem.productId == cartelem.productId)
          isProductInCart = true;
      })
      if(!isProductInCart){
        savedUser.cart.push(cartelem);
        res.json(cartelem)
        savedUser.save();
      }
    }
  })
});

let newCart

router.post("/updateCart",requireLogin, (req, res) => {
  const { userId, productId, quantity, title, price } = req.body;
  User.findById(userId, (err, savedUser) => {
    if (err) logger.error("error in cart.js updateCart");
    else {
      new Promise((resolve, rej) => {
         newCart = savedUser.cart.map((cartelem) => {
          if (cartelem.productId === productId) {
            cartelem.quantity = quantity;
            res.json(cartelem)
            resolve()
            return cartelem
          } else {
              return cartelem;
          };
        });
      }).then(() => {
        savedUser.cart = newCart
        savedUser.save()
      })
      .catch(err => logger.error("error in updateCart ",err));
    }
  });
});

router.post("/deleteProductFromCart", requireLogin, (req,res)=>{
  const {userId,productId} = req.body;
  logger.debug("delete product from cart "+userId)
  User.findById(userId,(err,savedUser)=>{
    if(err){
      logger.error("error in deleteProductFromCart in Cart.js"+err)
    }
    else{
      savedUser.cart = savedUser.cart.filter((cartelem)=>{
        return cartelem.productId !== productId
      })
      savedUser.save()
      res.json({Cart:savedUser.cart})
    }
  })
})

router.post("/getCart", requireLogin, (req,res)=>{
    const {userId} = req.body
    logger.debug(userId)
    User.findById(userId,(err,savedUser)=>{
        if(!savedUser){
            logger.warn("some error happened in cart.js in getCart")
        }
        else{
            res.json({Cart:savedUser.cart})
        }
    })
})

module.exports = router;
