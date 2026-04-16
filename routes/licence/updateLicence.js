const express = require('express');
const router = express.Router();
const Licencja = require('../../models/licencja');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.put("/:id", verifyAdminToken, async (req, res) => {
    const {id} = req.params;
    const { idOkreguPZW, czyCzlonekPZW, opis, cena, czasTrwania } = req.body;
    try {
        const updatedLicence = await Licencja.findByIdAndUpdate(
            id, 
            { idOkreguPZW, czyCzlonekPZW, opis, cena, czasTrwania }, 
            { new: true }
        );
        if (!updatedLicence) {
            return res.status(404).json({ message: "Licence not found!" });
        }
        res.status(200).json({ message: "Licence updated successfully!", licencja: updatedLicence });
    } catch (err) {
        res.status(500).json({ message: "Error updating licence!", error: err });
    }
});

module.exports = router;