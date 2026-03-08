const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');

router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json({ message: "User deleted successfully!", user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user!", error: err });
    }
});

module.exports = router;