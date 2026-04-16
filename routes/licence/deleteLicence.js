const express = require('express');
const router = express.Router();
const Licencja = require('../../models/licencja');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.delete("/:id", verifyAdminToken, async (req, res) => {
    const {id} = req.params;
    try {
        const deletedLicence = await Licencja.findByIdAndDelete(id);
        if (!deletedLicence) {
            return res.status(404).json({ message: "Licence not found!" });
        }
        res.status(200).json({ message: "Licence deleted successfully!", licencja: deletedLicence });
    } catch (err) {
        res.status(500).json({ message: "Error deleting licence!", error: err });
    }
});

module.exports = router;