const jwt = require("../node_modules/jsonwebtoken");
const {JWT_SECRET} = require("../keys");
const User = require("../models/userModel");
// const mongoose = require("mongoose")
// const {User} = require("../models")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({error:"jwtNotMatched"})
    }
    const token = authorization.replace("Bearer ","")

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            console.log(err)
            return res.status(401).json({error:err.message})
        }
        const _id = payload._id;
        User.findById(_id,(err,userdata) => {
            if(!userdata)
                return res.status(401).json({error:"User not found in database"})
            req.user = userdata ;
            console.log("next stage")
            next();
        })
    })
}

