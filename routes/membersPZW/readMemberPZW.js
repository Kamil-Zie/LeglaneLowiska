const express = require('express');
const router = express.Router();
const MemberPZW = require('../../models/czlonekPZW');
const {verifyToken, verifyAdminToken} = require('../../utils/JWT_Token')

router.get("/", verifyAdminToken, async (req, res) => {
    try {
        const members = await MemberPZW.find();
        res.status(200).json({ members });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving members PZW!", error: err });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    const memberId = req.params.id;
    if(verifyToken) {
        const decodedToken = jwt.decode(req.cookies["LegalneLowiskaToken"]);
        if(decodedToken.id !== memberId) return res.status(403).json({message: "You can only view your own member data!"});
    }
    try {
        const member = await MemberPZW.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member PZW not found!" });
        }
        res.status(200).json({ member });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Member PZW!", error: err });
    }
});

module.exports = router;