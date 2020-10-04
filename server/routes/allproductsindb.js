const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const requireLogin = require("../middleware/requireLogin");

let counter = 1;
router.get("/allproducts",requireLogin,(req,res)=>{
    Product.find().limit(counter*5).then(products => {
        console.log("request recieved")
        counter+=1
        res.json({products:products})
    }).catch(err => console.log("server error in get \"products\" "+ err))
})

module.exports = router;