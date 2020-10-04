const express = require("express");
const app = express();
const Port = 4000;
const { MONGOURI } = require("./keys");
const mongoose = require("mongoose");
const routeruser = require("./routes/userauth")
const routeradmin = require("./routes/adminauth")
const routeraddproduct = require("./routes/addproductindb");
const routerallproduct = require("./routes/allproductsindb")
const routerproduct = require("./routes/product.js");


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah !");
});

mongoose.connection.on("error",()=>{
    console.log("error connecting to mongo " ,)
}).catch(err =>{
  console.log("error is",err)
})

app.use(express.json())
//routes
app.use(routeruser)
app.use(routeradmin)
app.use(routeraddproduct)
app.use(routerallproduct)
app.use(routerproduct)

app.listen(Port, () => {
  console.log("server is running on ", Port);
});

