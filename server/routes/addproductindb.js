const express = require("express");
const router = express.Router()
const Product = require("../models/productModel")

router.post("/addproductindb", (req, res) => {
    const { title, urls, features, price, quantity, description } = req.body;
    console.log(title, urls, features, price, quantity, description)
    const product = new Product({
        title: title,
        features: features,
        inStock: true,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        rating: 0,
        description: description,
        images: urls
    }).save().then(() => {
        res.json({ message: "product details saved successfully" })
    }).catch((err) => { console.log(err) })
})

module.exports = router;