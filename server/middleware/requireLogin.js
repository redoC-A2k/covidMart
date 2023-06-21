const jwt = require("../node_modules/jsonwebtoken");
const logger = require("../services/logger")
const User = require("../models/userModel");
require("dotenv").config()

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({error:"jwtNotMatched"})
    }
    const token = authorization.replace("Bearer ","")

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
            logger.error(err)
            return res.status(401).json({error:err.message})
        }
        const _id = payload._id;
        User.findById(_id,(err,userdata) => {
            if(!userdata){
                logger.error("User not found in database, Jwt may be expired")
                return res.status(401).json({error:"You may need to signin again"})
            }
            req.user = userdata ;
            logger.debug("next stage")
            next();
        })
    })
}

