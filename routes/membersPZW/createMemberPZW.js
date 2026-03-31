const express = require('express');
const router = express.Router();
const MemberPZW = require('../../models/czlonekPZW');
const {verifyToken} = require('../../utils/JWT_Token')

router.post("/", verifyToken, async (req, res) => {
    const { imie, nazwisko, numerLegitymacji, dataWydania, dataWaznosci, posiadaneLicencje } = req.body;
    const newMemberPZW = new MemberPZW({
        imie,
        nazwisko,
        numerLegitymacji,
        dataWydania,
        dataWaznosci,
        posiadaneLicencje
    });

    newMemberPZW.save()
        .then(member => res.status(201).json({ message: "Member PZW created successfully", member }))
        .catch(error => res.status(500).json({ error: error }));
});

module.exports = router;