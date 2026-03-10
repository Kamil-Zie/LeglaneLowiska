const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const { verifyToken } = require('../../utils/JWT_Token');

router.post("/", verifyToken, async (req, res) => {
    res.clearCookie("LegalneLowiskaToken", {path: "/"});
    res.status(200).json({message: "User signed out successfully!"});
});

module.exports = router;