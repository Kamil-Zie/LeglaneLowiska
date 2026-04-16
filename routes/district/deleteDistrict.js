const express = require('express');
const router = express.Router();
const OkregPZW = require('../../models/okregPZW');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.delete("/:id", verifyAdminToken, async (req, res) => {
    const {id} = req.params;
    try {
        const deletedDistrict = await OkregPZW.findByIdAndDelete(id);
        if (!deletedDistrict) {
            return res.status(404).json({ message: "District not found!" });
        }
        res.status(200).json({ message: "District deleted successfully!", okreg: deletedDistrict });
    } catch (err) {
        res.status(500).json({ message: "Error deleting district!", error: err });
    }
});

module.exports = router;