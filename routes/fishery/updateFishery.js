const express = require('express');
const router = express.Router();
const Lowisko = require('../../models/lowisko');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.put("/:id", verifyAdminToken, async (req, res) => {
    const {id} = req.params;
    const { nazwa, lat, lng, typeLowiska, idOkreguPZW } = req.body;
    try {
        const updatedFishery = await Lowisko.findByIdAndUpdate(
            id, 
            { nazwa, lat, lng, typeLowiska, idOkreguPZW }, 
            { new: true }
        );
        if (!updatedFishery) {
            return res.status(404).json({ message: "Fishery not found!" });
        }
        res.status(200).json({ message: "Fishery updated successfully!", lowisko: updatedFishery });
    } catch (err) {
        res.status(500).json({ message: "Error updating fishery!", error: err });
    }
});

module.exports = router;