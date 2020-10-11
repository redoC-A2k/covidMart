const jwt = require("../node_modules/jsonwebtoken");
const {JWT_SECRET} = require("../keys");
const User = require("../models/userModel");
// const mongoose = require("mongoose")
// const {User} = require("../models")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"jwtNotMatched"})
    }
    const token = authorization.replace("Bearer ","")

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            console.log(err)
            return res.status(401).json({error:err.message})
        }
        const _id = payload._id;
        User.findById(_id).then((userdata) => {
            req.user = userdata ;
            next();
        })
    })
}

