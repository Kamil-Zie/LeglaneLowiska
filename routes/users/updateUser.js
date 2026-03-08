const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');

router.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const { nazwa, miasto, email, haslo } = req.body;
    try {
        const updatedUser = await User
            .findByIdAndUpdate(userId, { email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json({ message: "User updated successfully!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Error updating user!", error: err });
    }
});

router.put("/ulubioneLowisko/:id", async (req, res) => {
    const userId = req.params.id;
    const { lowiskoId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        if (user.ulubioneLowiska.includes(lowiskoId)) {
            user.ulubioneLowiska.pull(lowiskoId);
        } else {
            user.ulubioneLowiska.push(lowiskoId);
        }
        const updatedUser = await user.save();
        res.status(200).json({ message: "User's favorite fishing spot updated successfully!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Error updating user's favorite fishing spot!", error: err });
    }
});

module.exports = router;