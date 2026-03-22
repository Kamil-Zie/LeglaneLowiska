const express = require('express');
const router = express.Router();
const OkregPZW = require('../../models/okregPZW');
const {verifyToken} = require('../../utils/JWT_Token')

router.get('/', verifyToken, async (req, res) => {
    try {
        const districts = await OkregPZW.find();
        res.json({ okregi: districts });
    } catch (error) {
        console.error("Error fetching districts:", error);
        res.status(500).json({ message: "Error fetching districts" });
    }
});

module.exports = router;