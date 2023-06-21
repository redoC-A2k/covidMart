const express = require("express");
const logger = require("../services/logger")
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../node_modules/jsonwebtoken");
const nodemailer = require("nodemailer")
const Token = require("../models/tokenModel")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
require("dotenv").config()

const emailTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, "/../assets/index.handlebars"), "utf-8"))


router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  logger.debug(name, email, password);
  if (!name) {
    return res.status(422).json({ error: "Enter all fields" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "User already exist" });
    }
    bcryptjs.hash(password, parseInt(process.env.BCRYPT_ROUND,10)).then((hashedpassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedpassword,
        cart:[],
        myRatings:[{productId:"",value:0}]
      });
      logger.debug(user)
      user
        .save()
        .then(() => {
          logger.info("saved successfully");
          res.json({ message: "ok" });
        })
        .catch((err) => {
          logger.error("error in saving", err);
        });
    });
  });
},err=>{
  logger.error("error in signup"+err)
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(422).json({ error: "enter all fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "userNotExist" });
    }
    logger.debug(savedUser)
    bcryptjs
      .compare(password, savedUser.password)
      .then((domatch) => {
        if (domatch) {
          const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
          logger.debug(token)
          res.json({
            message: "sign in successfull",
            token: token,
            userId:savedUser._id
          });
        } else {
          res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch((err) => {
        logger.error("error in comparing", err);
      });
  });
},err => {
  logger.error("error in signin"+err)
});

router.post("/user/forgot-password",(req,res)=>{
  const {email} = req.body;
  console.log(email)
  User.findOne({email:email}).then( async (savedUser)=>{
    if(!savedUser) res.json({error: "There is no account associated with this email"})
    else{
      await Token.deleteMany({userId:savedUser._id});//deleting old token
      let token = await new Token({
        userId:savedUser._id,
        token:crypto.randomBytes(32).toString("hex")
      }).save();
      const link = process.env.FRONTEND_URL+'/user/'+savedUser._id+'/'+token.token;
      const emailMessage = emailTemplate({buttonLink:link})
      try {
        let transporter = nodemailer.createTransport({
          host:"smtp-relay.sendinblue.com",
          port:587,
          auth:{
            user:"afshanahmeda2k@gmail.com",
            pass:process.env.BREVO_KEY
          }
        }) 
        transporter.sendMail({
          from:"covid-mart-help@yandex.com",
          to:email,
          subject:"Reset Password",
          html:emailMessage
        }).then(messagestatus=>{
          logger.info("message gets delivered",messagestatus)
          res.json({message:"Check your mailbox for link"})
        })
      } catch (error) {
        logger.error("Oops , error occured"+error.toString()) 
        res.json({error: "Something went wrong!"})
      }
    }
  })
})

router.post("/user/password/reset",async (req,res)=>{
  try {
    const {userId, password, token} = req.body
    console.log(userId,password,token)
    if(!userId || !password || !token)
    throw "A field is empty in request"
    else {
      const foundtoken = await Token.findOne({token:token,userId:userId})
      if(!foundtoken)
      res.json({error:"Invalid Link or token expired"})
      else {
        const savedUser = await User.findOne({_id:userId})
        bcryptjs.hash(password,parseInt(process.env.BCRYPT_ROUND,10)).then(hashedpassword => {
          savedUser.password = hashedpassword;
          savedUser.save()
          .then(()=>{
            foundtoken.delete()
            res.json({message:"Password Updated successfully"})
          })
        })
      }
    }
  } catch (error) {
    logger.error("Unable to update password "+error.message)
    res.json({error:"Something went wrong"})
  }

})

module.exports = router;
