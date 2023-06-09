const express = require("express");
const logger = require("../services/logger")
const router = express.Router();
const Product = require("../models/productModel");
const requireLogin = require("../middleware/requireLogin");

router.get("/allproducts", requireLogin, (req, res) => {
  Product.find()
    .then((products) => {
      logger.debug("request recieved");
      res.json(products);
    })
    .catch((err) => logger.error('server error in get "products" ' + err));
});

router.post("/filter",requireLogin, (req, res) => {
  const { price, category } = req.body;
  let filter ;
  if(category==="all"){
    filter={
      price:{$lt:price}
    }
  }
  else{
    filter = {
      $and: [ { price: { $lt: price  } },{ category:  category  }],
    };
  }
  
  Product.find(filter)
    .then((products) => {
      res.json(products);
    }).catch(err => {
      logger.error("error in /filter in allproductsindb.js",err)
    })
});

// fuzzy search for product when user enters some text in search box  
// referenced from here - https://stackoverflow.com/a/38427476
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
router.put("/products/search/",requireLogin,async (req,res)=>{
  let searchTxt = req.body.searchTxt;
  const regex = new RegExp(escapeRegex(searchTxt), 'gi');
  // logger.info(regex.source)
  Product.find({
    "title":regex
  }).limit(8).then(products=>res.json(products))
  .catch(err=>logger.error(err))
})

module.exports = router;
