const express = require("express");
const app = express();
const Port = 4000;
const { MONGOURI } = require("./keys");
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

mongoose.connect(MONGOURI,{
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
app.listen(Port, () => {
  logger.info("server is running on "+ Port);
});

