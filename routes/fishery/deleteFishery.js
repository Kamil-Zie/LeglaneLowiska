const express = require('express');
const router = express.Router();
const Lowisko = require('../../models/lowisko');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.delete("/:id", verifyAdminToken, async (req, res) => {
    const {id} = req.params;
    try {
        const deletedFishery = await Lowisko.findByIdAndDelete(id);
        if (!deletedFishery) {
            return res.status(404).json({ message: "Fishery not found!" });
        }
        res.status(200).json({ message: "Fishery deleted successfully!", lowisko: deletedFishery });
    } catch (err) {
        res.status(500).json({ message: "Error deleting fishery!", error: err });
    }
});

module.exports = router;