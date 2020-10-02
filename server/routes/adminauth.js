const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");

router.post("/admin", (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(422).json({ error: "enter all fields" });
  }
  Admin.findOne({ email: email }).then((savedAdmin) => {
    if (!savedAdmin) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    if (savedAdmin.password == password) {
      res.json({ message: "successfully signed in" });
    } else {
      res.status(422).json({ error: "invalid email or password" });
    }
  });
});

module.exports = router;