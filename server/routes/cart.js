const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { Promise } = require("mongoose");
router.post("/addToCart", (req, res) => {
  const { userId, productId, quantity, title, price } = req.body;
  const cartelem = {
    productId: productId,
    quantity: quantity,
    title: title,
    price: price,
  };
  User.findById(userId, (err, savedUser) => {
    if (err) console.log("error in cart.js addToCart" + err);
    else {
      if(savedUser.cart[0].productId === "empty"){
        savedUser.cart.pop();
      }
      savedUser.cart.push(cartelem);
      res.json(cartelem)
      savedUser.save();
    }
  })
});

let newCart

router.post("/updateCart", (req, res) => {
  const { userId, productId, quantity, title, price } = req.body;
  User.findById(userId, (err, savedUser) => {
    if (err) console.log("error in cart.js updateCart");
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
      });
    }
  });
});

router.post("/deleteProductFromCart",(req,res)=>{
  const {userId,productId} = req.body;
  User.findById(userId,(err,savedUser)=>{
    if(err){
      console.log("error in deleteProductFromCart in Cart.js"+err)
    }
    else{
      savedUser.cart = savedUser.cart.filter((cartelem)=>{
        return cartelem.productId !== productId
      })
      if(savedUser.cart.length === 0){
        savedUser.cart.push({productId:"empty"})
      }
      savedUser.save()
      res.json({Cart:savedUser.cart})
    }
  })
})

router.post("/getCart",(req,res)=>{
    const {userId} = req.body
    User.findById(userId,(err,savedUser)=>{
        if(err){
            console.log("some error happened in cart.js in getCart")
        }
        else{
            res.json({Cart:savedUser.cart})
        }
    })
})

module.exports = router;
