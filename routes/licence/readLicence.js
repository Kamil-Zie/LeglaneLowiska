const express = require('express');
const router = express.Router();
const Licencja = require('../../models/licencja');
const {verifyToken} = require('../../utils/JWT_Token');
const User = require('../../models/uzytkownik');

router.get("/", verifyToken, async (req, res) => {
    await Licencja.find().then((licencje) => {
        res.status(200).json({message: "Licencje retrieved successfully!", licencje});
    }).catch((err) => res.status(500).json({message: "Error retrieving licencje!", error: err}));
});

router.get("/:id", verifyToken, async (req, res) => {
    const {id} = req.params;
    try {
        const licencja = await Licencja.findById(id);
        if(!licencja) return res.status(404).json({message: "Licencja not found!", id:id});
        res.status(200).json({message: "Licencja retrieved successfully!", licencja});
    } catch (err) {
        res.status(500).json({message: "Error retrieving licencja!", error: err});
    }
});

router.get("/user/:userId", verifyToken, async (req, res) => {
    const {userId} = req.params;
    try {
        const licencje = await User.findById(userId);
        if(!licencje) return res.status(404).json({message: "User not found!", id:userId});
        res.status(200).json({message: "Licencje retrieved successfully!", licencje: licencje.posiadaneLicencje});
    } catch (err) {
        res.status(500).json({message: "Error retrieving licencje!", error: err});
    }
});

module.exports = router;
