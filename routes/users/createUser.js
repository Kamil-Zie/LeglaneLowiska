const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const OTP = require('../../models/otp');
const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/JWT_Token');

router.post("/", async (req, res) => {
  const { email, password, otp } = req.body;
  try{
    

  const validOtpRecord = await OTP.findOne({ email, otp });
      if (!validOtpRecord) {
          return res.status(400).json({ message: "Invalid or expired verification code." });
      }
  const nazwa = email.split('@')[0];
  await bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const newUser = new User({
      nazwa: nazwa,
      miasto: null,
      email: email,
      haslo: hash,
      posiadaneLicencje: [],
      iloscOpinii: 0,
      ulubioneLowiska: [],
      czlonePZW: null
    });

    const accesToken = createToken(newUser);
    const savedUser = await newUser.save();
    await OTP.deleteOne({ email });

    return res.status(201)
      .cookie("LegalneLowiskaToken", accesToken, { maxAge: 60*60*24*30*100 })
      .json({ message: "User created successfully", user: savedUser });
  });
  }
  catch(err){
    return res.status(500).json({ error: err });
  }
});

module.exports = router;