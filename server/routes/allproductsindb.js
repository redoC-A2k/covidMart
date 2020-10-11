const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const requireLogin = require("../middleware/requireLogin");

router.get("/allproducts", requireLogin, (req, res) => {
  Product.find()
    .then((products) => {
      console.log("request recieved");
      res.json(products);
    })
    .catch((err) => console.log('server error in get "products" ' + err));
});

// router.post("/filterByPrice", requireLogin, (req, res) => {
//   const { price } = req.body;
//   Product.find().then((products) => {
//     let filteredProducts = products.filter((product) => {
//       return product.price < price;
//     });
//     res.json(filteredProducts);
//   });
// });

// router.post("/filterByCategory", (req, res) => {
//   const { category } = req.body;
//   if (category === "all") {
//     Product.find().then((products) => {
//       res.json(products);
//     });
//   } else {
//     Product.find().then((products) => {
//       let filteredProducts = products.filter((product) => {
//         // console.log(product.category)
//         return product.category=== category;
//       });
//       res.json(filteredProducts);
//     });
//   }
// });
router.post("/filter", (req, res) => {
  const { price, category, noOfProducts } = req.body;
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
    .limit(noOfProducts)
    .then((products) => {
      res.json(products);
    }).catch(err => {
      console.log("error in /filter in allproductsindb.js",err)
    })
});
module.exports = router;
