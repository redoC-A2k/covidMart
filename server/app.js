const express = require("express");
const path = require("path")
const app = express();
const Port = 4000;
const mongoose = require("mongoose");
const routeruserauth = require("./routes/userauth")
const routeradmin = require("./routes/adminauth")
const routeraddproduct = require("./routes/addproductindb");
const routerallproduct = require("./routes/allproductsindb")
const routerproduct = require("./routes/product.js");
const routercart = require("./routes/cart")
const routeruser = require("./routes/user")
const routerorder = require("./routes/order")
const cors = require("cors")
const logger = require("./services/logger")
require("dotenv").config()

mongoose.connect(`${process.env.MONGOURI}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
});

mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => {
  logger.info("connected to mongo yeah !");
});

mongoose.connection.on("error",()=>{
   logger.fatal("error connecting to mongo " ,)
}).catch(err =>{
  logger.fatal("error is",err)
})

app.use(cors())
app.use(express.json())
//routes
app.use(routeruserauth)
app.use(routeradmin)
app.use(routeraddproduct)
app.use(routerallproduct)
app.use(routerproduct)
app.use(routercart)
app.use(routeruser)
app.use(routerorder)
let thispath = path.join(__dirname,'..','client','build')
app.use(express.static(thispath))
app.get('/*', (req,res)=>{
  res.sendFile(thispath+"/index.html")
  // res.json("hello")
})
app.listen(Port, () => {
  logger.info("server is running on "+ Port);
});

