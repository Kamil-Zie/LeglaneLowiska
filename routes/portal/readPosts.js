const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

router.get("/", verifyToken, async (req, res) => {
    await Post.find()
        .populate('uzytkownik', 'nazwa zdjecie')
        .populate('komentarze.uzytkownik', 'nazwa zdjecie')
        .populate({
            path: 'sharedPost',
            populate: { path: 'uzytkownik', select: 'nazwa zdjecie' }
        })
        .sort({ createdAt: -1 })
        .then((posts) => res.status(200).json({ message: "Posty pobrane pomyślnie!", posts }))
        .catch((err) => res.status(500).json({ message: "Błąd podczas pobierania postów!", error: err }));
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('uzytkownik', 'nazwa zdjecie')
            .populate('komentarze.uzytkownik', 'nazwa zdjecie')
            .populate({
                path: 'sharedPost',
                populate: { path: 'uzytkownik', select: 'nazwa zdjecie' }
            });
        if (!post) {
            return res.status(404).json({ message: "Post nie został znaleziony!" });
        }
        res.status(200).json({ message: "Post pobrany pomyślnie!", post });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas pobierania postu!", error: err });
    }
});

module.exports = router;