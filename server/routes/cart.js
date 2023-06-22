const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const requireLogin = require("../middleware/requireLogin");
const logger = require("../services/logger")

router.post("/addToCart",requireLogin, (req, res) => {
  const { userId, productId,  title, price } = req.body;
  const cartelem = {
    productId: productId,
    quantity: 1,
    title: title,
    price: price,
  };
  try {
    User.findById(userId, async (err, savedUser) => {
      if (err) logger.error("error in cart.js addToCart" + err);
      else {
        let isProductInCart = false;
        for(let i=0; i<savedUser.cart.length; i++)
        if(savedUser.cart[i].productId == cartelem.productId){
          isProductInCart = true;
          if(savedUser.cart[i].quantity<9){
            savedUser.cart[i].quantity+=1;
            savedUser.save()
            .then(savedDocument=>{
              res.json({message:"Product added to cart successfully"})
            })
          }
          else 
          res.json({message:"Max cart limit reached"})
          break;
        }
        if(!isProductInCart){
          savedUser.cart.push(cartelem);
          savedUser.save()
          .then((savedDocument)=>{
            res.json({message:"Product added to cart successfully"})
          })
        }
      }
    })
  } catch (error) {
    logger.error("Error occured while adding product to cart in addToCart function")
    res.json({error:"Something went wrong while adding product to cart"})
  }
});


router.put("/updateCart",requireLogin, (req, res) => {
  const { userId, productId, quantity} = req.body;
  try {
    User.findById(userId, (err, savedUser) => {
      if (err) logger.error("error in cart.js updateCart");
      else if(!savedUser) res.json({error:"Unable to find user"})
      else {
        for(let i=0; i<savedUser.cart.length; i++){
          if(savedUser.cart[i].productId===productId){
            savedUser.cart[i].quantity = quantity;
            savedUser.save()
            res.json({message:"quantity updated"})
            break;
          }
        }
      }
    });
  } catch (error) {
  logger.error("error in updating cart of the user",error)
  res.json({error:"Unable to update quantity"})
  }
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
