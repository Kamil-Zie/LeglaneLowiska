const express = require('express');
const router = express.Router();
const OkregPZW = require('../../models/okregPZW');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.put("/:id", verifyAdminToken, async (req, res) => {
    const {id} = req.params;
    const { nazwa } = req.body;
    try {
        const updatedDistrict = await OkregPZW.findByIdAndUpdate(
            id, 
            { nazwa }, 
            { new: true }
        );
        if (!updatedDistrict) {
            return res.status(404).json({ message: "District not found!" });
        }
        res.status(200).json({ message: "District updated successfully!", okreg: updatedDistrict });
    } catch (err) {
        res.status(500).json({ message: "Error updating district!", error: err });
    }
});

module.exports = router;