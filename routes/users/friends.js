const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const { verifyToken } = require('../../utils/JWT_Token');

// Send Friend Request
router.post('/request/:id', verifyToken, async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
        return res.status(400).json({ message: "Nie możesz wysłać zaproszenia do samego siebie!" });
    }

    try {
        const targetUser = await User.findById(targetUserId);
        const currentUser = await User.findById(currentUserId);

        if (!targetUser) return res.status(404).json({ message: "Użytkownik nie znaleziony!" });

        if (currentUser.friends.includes(targetUserId)) {
            return res.status(400).json({ message: "Jesteście już znajomymi!" });
        }

        if (targetUser.friendRequests.includes(currentUserId)) {
            return res.status(400).json({ message: "Zaproszenie zostało już wysłane!" });
        }

        targetUser.friendRequests.push(currentUserId);
        await targetUser.save();

        res.status(200).json({ message: "Zaproszenie wysłane pomyślnie!" });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas wysyłania zaproszenia!", error: err });
    }
});

// Accept Friend Request
router.post('/accept/:id', verifyToken, async (req, res) => {
    const requesterId = req.params.id;
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId);
        const requester = await User.findById(requesterId);

        if (!requester) return res.status(404).json({ message: "Użytkownik nie znaleziony!" });

        if (!currentUser.friendRequests.includes(requesterId)) {
            return res.status(400).json({ message: "Brak zaproszenia od tego użytkownika!" });
        }

        // Add to friends lists
        currentUser.friends.push(requesterId);
        requester.friends.push(currentUserId);

        // Remove from requests
        currentUser.friendRequests = currentUser.friendRequests.filter(id => id.toString() !== requesterId);

        await currentUser.save();
        await requester.save();

        res.status(200).json({ message: "Zaproszenie zaakceptowane!", user: currentUser });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas akceptowania zaproszenia!", error: err });
    }
});

// Decline/Cancel Friend Request
router.post('/decline/:id', verifyToken, async (req, res) => {
    const requesterId = req.params.id;
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId);
        currentUser.friendRequests = currentUser.friendRequests.filter(id => id.toString() !== requesterId);
        await currentUser.save();

        res.status(200).json({ message: "Zaproszenie odrzucone!", user: currentUser });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas odrzucania zaproszenia!", error: err });
    }
});

// Remove Friend
router.delete('/:id', verifyToken, async (req, res) => {
    const friendId = req.params.id;
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId);
        const friend = await User.findById(friendId);

        if (!friend) return res.status(404).json({ message: "Użytkownik nie znaleziony!" });

        currentUser.friends = currentUser.friends.filter(id => id.toString() !== friendId);
        friend.friends = friend.friends.filter(id => id.toString() !== currentUserId);

        await currentUser.save();
        await friend.save();

        res.status(200).json({ message: "Znajomy usunięty!", user: currentUser });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas usuwania znajomego!", error: err });
    }
});

// Get Suggested Friends
router.get('/suggestions', verifyToken, async (req, res) => {
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId);
        
        // Find users who:
        // 1. Are not the current user
        // 2. Are not already friends
        // 3. Haven't received a request from current user
        // 4. Haven't sent a request to current user
        
        const excludedIds = [
            currentUserId,
            ...currentUser.friends,
            ...currentUser.friendRequests
        ];

        // Also exclude people to whom the current user sent requests
        const usersWithOurRequest = await User.find({ friendRequests: currentUserId }, '_id');
        excludedIds.push(...usersWithOurRequest.map(u => u._id));

        const suggestions = await User.find({
            _id: { $nin: excludedIds }
        }).limit(10).select('nazwa miasto opis');

        res.status(200).json({ suggestions });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas pobierania sugestii!", error: err });
    }
});

// Get Friends List with details
router.get('/list', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'nazwa miasto opis');
        const pendingRequests = await User.findById(req.user.id).populate('friendRequests', 'nazwa miasto opis');
        
        res.status(200).json({ 
            friends: user.friends,
            pendingRequests: pendingRequests.friendRequests
        });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas pobierania listy znajomych!", error: err });
    }
});

module.exports = router;