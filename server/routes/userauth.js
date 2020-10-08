const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const { JWT_SECRET } = require("../keys");
const jwt = require("../node_modules/jsonwebtoken");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name) {
    return res.status(422).json({ error: "Enter all fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "User already exist" });
    }
    bcryptjs.hash(password, 12).then((hashedpassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedpassword,
        cart:[{productId:"empty"}]
      });
      console.log(user)
      user
        .save()
        .then(() => {
          console.log("saved successfully");
          res.json({ message: "ok" });
        })
        .catch((err) => {
          console.log("error in saving", err);
        });
    });
  });
},err=>{
  console.log("error in signup"+err)
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(422).json({ error: "enter all fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcryptjs
      .compare(password, savedUser.password)
      .then((domatch) => {
        if (domatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          console.log(token)
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
        console.log("error in comparing", err);
      });
  });
},err => {
  console.log("error in signin"+err)
});

module.exports = router;
