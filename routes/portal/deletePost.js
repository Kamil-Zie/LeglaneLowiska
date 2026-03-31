const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

router.delete("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post nie znaleziony!" });
        }

        // Verify if the user deleting the post is the owner
        // verifyToken middleware sets req.user with decoded token
        if (post.uzytkownik.toString() !== req.user.id) {
            return res.status(403).json({ message: "Nie masz uprawnień do usunięcia tego posta!" });
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post usunięty pomyślnie!" });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas usuwania posta!", error: err });
    }
});

module.exports = router;