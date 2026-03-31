const express = require('express');
const router = express.Router();
const Licencja = require('../../models/licencja');
const {verifyToken} = require('../../utils/JWT_Token')

router.get("/", verifyToken, async (req, res) => {
    await Licencja.find().then((licencje) => {
        res.status(200).json({message: "Licencje retrieved successfully!", licencje});
    }).catch((err) => res.status(500).json({message: "Error retrieving licencje!", error: err}));
});

module.exports = router;
