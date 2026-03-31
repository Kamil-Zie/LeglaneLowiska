const express = require('express');
const router = express.Router();
const MemberPZW = require('../../models/czlonekPZW');
const {verifyAdminToken} = require('../../utils/JWT_Token')

router.delete("/:id", verifyAdminToken, async (req, res) => {
    const memberId = req.params.id;
    try {
        const deletedMember = await MemberPZW.findByIdAnd
            Delete(memberId);
        if (!deletedMember) {
            return res.status(404).json({ message: "Member PZW not found!" });
        }
        res.status(200).json({ message: "Member PZW deleted successfully!", member: deletedMember });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Member PZW!", error: err });
    }
});

module.exports = router;