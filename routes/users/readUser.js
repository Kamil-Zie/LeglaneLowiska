const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const bcrypt = require('bcrypt');
const { createToken, verifyToken, verifyAdminToken } = require('../../utils/JWT_Token');
const jwt = require('jsonwebtoken');

router.post("/", async (req ,res) => {
  const {email, password} = req.body;
  if((email.length === 0 || password.length === 0) || !email.includes("@")) {
    return res.status(400).json({message: "Email and password are required!"});
  }
  await User.findOne({email: email}).then(async (user) => {
    if(!user) return res.status(404).json({message: "User not found!"});
    await bcrypt.compare(password, user.haslo, (err, result) => {
      if(err) return res.status(500).json({message: "Error comparing passwords!"});
      if(!result) return res.status(401).json({message: "Incorrect password!"});
      const accessToken = createToken(user);
      res.status(201).cookie("LegalneLowiskaToken", accessToken, {maxAge:60*60*24*30*100}).json({message: "User signed in successfully!", user});
    });}).catch((err) => res.status(500).json({message: "Error signing in user!", error: err}));

});

router.get("/", verifyAdminToken, async (req, res) => {
    await User.find().then((users) => {
        res.status(200).json({message: "Users retrieved successfully!", users});
    }).catch((err) => res.status(500).json({message: "Error retrieving users!", error: err}));
});

router.get("/:id", verifyToken, async (req, res) => {
    const {id} = req.params;
    const decodedToken = jwt.decode(req.cookies["LegalneLowiskaToken"]);
    if(decodedToken.id !== id) return res.status(403).json({message: "You can only access your own user data!"});
    await User.findById(decodedToken.id).then((user) => {
        if(!user) return res.status(404).json({message: "User not found!"});
        res.status(200).json({message: "User retrieved successfully!", user});
    }).catch((err) => res.status(500).json({message: "Error retrieving user!", error: err}));
});

module.exports = router;