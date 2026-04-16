const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

const populatePost = (id) => {
    return Post.findById(id)
        .populate('uzytkownik', 'nazwa zdjecie')
        .populate('komentarze.uzytkownik', 'nazwa zdjecie')
        .populate('komentarze.odpowiedzi.uzytkownik', 'nazwa zdjecie')
        .populate({
            path: 'sharedPost',
            populate: { path: 'uzytkownik', select: 'nazwa zdjecie' }
        });
};

// Like/Unlike post
router.put("/like/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { uzytkownikId } = req.body;
    
    try {
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({ message: "Post nie znaleziony!" });

        if(post.polubienia.includes(uzytkownikId)) {
            post.polubienia = post.polubienia.filter(p => p.toString() !== uzytkownikId);
        } else {
            post.polubienia.push(uzytkownikId);
        }

        await post.save();
        const populatedPost = await populatePost(id);
        res.status(200).json({ message: "Zaktualizowano polubienia!", post: populatedPost });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas polubienia posta!", error: err });
    }
});

// Add comment
router.put("/comment/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { uzytkownikId, tekst } = req.body;

    if(!tekst) return res.status(400).json({ message: "Tekst komentarza jest wymagany!" });

    try {
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({ message: "Post nie znaleziony!" });

        post.komentarze.push({
            uzytkownik: uzytkownikId,
            tekst,
            polubienia: [],
            odpowiedzi: []
        });

        await post.save();
        const populatedPost = await populatePost(id);
        res.status(200).json({ message: "Dodano komentarz!", post: populatedPost });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas dodawania komentarza!", error: err });
    }
});

// Like/Unlike comment
router.put("/comment/like/:postId/:commentId", verifyToken, async (req, res) => {
    const { postId, commentId } = req.params;
    const { uzytkownikId } = req.body;

    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({ message: "Post nie znaleziony!" });

        const comment = post.komentarze.id(commentId);
        if(!comment) return res.status(404).json({ message: "Komentarz nie znaleziony!" });

        if(comment.polubienia.includes(uzytkownikId)) {
            comment.polubienia = comment.polubienia.filter(p => p.toString() !== uzytkownikId);
        } else {
            comment.polubienia.push(uzytkownikId);
        }

        await post.save();
        const populatedPost = await populatePost(postId);
        res.status(200).json({ message: "Zaktualizowano polubienie komentarza!", post: populatedPost });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas polubienia komentarza!", error: err });
    }
});

// Reply to comment
router.put("/comment/reply/:postId/:commentId", verifyToken, async (req, res) => {
    const { postId, commentId } = req.params;
    const { uzytkownikId, tekst } = req.body;

    if(!tekst) return res.status(400).json({ message: "Tekst odpowiedzi jest wymagany!" });

    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({ message: "Post nie znaleziony!" });

        const comment = post.komentarze.id(commentId);
        if(!comment) return res.status(404).json({ message: "Komentarz nie znaleziony!" });

        comment.odpowiedzi.push({
            uzytkownik: uzytkownikId,
            tekst,
            polubienia: []
        });

        await post.save();
        const populatedPost = await populatePost(postId);
        res.status(200).json({ message: "Dodano odpowiedź!", post: populatedPost });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas odpowiadania na komentarz!", error: err });
    }
});

// Edit post content
router.put("/edit/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { ryba, rozmiar, waga, miejsce, opis, zdjecie } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post nie znaleziony!" });

        // Verify ownership
        if (post.uzytkownik.toString() !== req.user.id) {
            return res.status(403).json({ message: "Nie masz uprawnień do edycji tego posta!" });
        }

        // Update fields
        post.ryba = ryba || post.ryba;
        post.rozmiar = rozmiar || post.rozmiar;
        post.waga = waga || post.waga;
        post.miejsce = miejsce || post.miejsce;
        post.opis = opis !== undefined ? opis : post.opis;
        post.zdjecie = zdjecie !== undefined ? zdjecie : post.zdjecie;

        await post.save();
        const populatedPost = await populatePost(id);
        res.status(200).json({ message: "Post zaktualizowany pomyślnie!", post: populatedPost });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas edycji posta!", error: err });
    }
});

module.exports = router;