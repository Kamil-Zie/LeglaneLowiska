const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

router.get("/", verifyToken, async (req, res) => {
    await Post.find()
        .populate('uzytkownik', 'nazwa')
        .populate('komentarze.uzytkownik', 'nazwa')
        .sort({ createdAt: -1 })
        .then((posts) => res.status(200).json({ message: "Posty pobrane pomyślnie!", posts }))
        .catch((err) => res.status(500).json({ message: "Błąd podczas pobierania postów!", error: err }));
});

module.exports = router;