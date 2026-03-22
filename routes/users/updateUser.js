const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const {verifyToken} = require('../../utils/JWT_Token')
const jwt = require('jsonwebtoken');

router.put("/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;
    const { nazwa, miasto, email, haslo } = req.body;
    if(verifyToken) {
        const decodedToken = jwt.decode(req.cookies["LegalneLowiskaToken"]);
        if(decodedToken.id !== userId) return res.status(403).json({message: "You can only update your own user data!"});
    }
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

router.post("/favFishery/:id", async (req, res) => {
    const userId = req.params.id;
    const { lowiskoId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        if(!lowiskoId)
            return res.status(404).json({message: "Fishery not found."})
        if (user.ulubioneLowiska.includes(lowiskoId)) {
            user.ulubioneLowiska.pull(lowiskoId);
            const updatedUser = await user.save();
            res.status(200).json({ message: "User's favorite fishing spot pulled successfully!", user: updatedUser });
        } else {
            user.ulubioneLowiska.push(lowiskoId);
            const updatedUser = await user.save();
            res.status(200).json({ message: "User's favorite fishing spot pushed successfully!", user: updatedUser });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating user's favorite fishing spot!", error: err });
    }
});

module.exports = router;