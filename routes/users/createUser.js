const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/JWT_Token');

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const nazwa = email.split('@')[0];
  await bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const newUser = new User({
      nazwa: nazwa,
      misato: null,
      email: email,
      haslo: hash,
      posiadaneLicencje: [],
      iloscOpinii: 0,
      ulubioneLowiska: [],
      czlonePZW: null
    });

    const accesToken = createToken(newUser);
    newUser.save()
      .then(user =>res.status(201).cookie("LegalneLowiskaToken", accesToken, {maxAge:60*60*24*30*100}).json({ message: "User created successfully", user }))
      .catch(error => res.status(500).json({ error: error }));

  });
});

module.exports = router;