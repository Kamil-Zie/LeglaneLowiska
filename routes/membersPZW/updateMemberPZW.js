const express = require('express');
const router = express.Router();
const MemberPZW = require('../../models/czlonekPZW');
const {verifyToken} = require('../../utils/JWT_Token')

router.put("/:id", verifyToken, async (req, res) => {
    const memberId = req.params.id;
    const { imie, nazwisko, numerLegitymacji, dataWydania, dataWaznosci } = req.body;
    if(verifyToken) {
        const decodedToken = jwt.decode(req.cookies["LegalneLowiskaToken"]);
        if(decodedToken.id !== memberId) return res.status(403).json({message: "You can only update your own member data!"});
    }
    try {
        const updatedMember = await MemberPZW
            .findByIdAndUpdate(memberId, { imie, nazwisko, numerLegitymacji, dataWydania, dataWaznosci }, { new: true });
        if (!updatedMember) {
            return res.status(404).json({ message: "Member PZW not found!" });
        }
        res.status(200).json({ message: "Member PZW updated successfully!", member: updatedMember });
    } catch (err) {
        res.status(500).json({ message: "Error updating Member PZW!", error: err });
    }
});

module.exports = router;