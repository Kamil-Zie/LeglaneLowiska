const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

// Like/Unlike post
router.put("/like/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { uzytkownikId } = req.body;
    
    const post = await Post.findById(id);
    if(!post) return res.status(404).json({ message: "Post nie znaleziony!" });

    if(post.polubienia.includes(uzytkownikId)) {
        post.polubienia = post.polubienia.filter(p => p.toString() !== uzytkownikId);
    } else {
        post.polubienia.push(uzytkownikId);
    }

    await post.save()
        .then((updatedPost) => res.status(200).json({ message: "Zaktualizowano polubienia!", post: updatedPost }))
        .catch((err) => res.status(500).json({ message: "Błąd podczas polubienia posta!", error: err }));
});

// Add comment
router.put("/comment/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { uzytkownikId, tekst } = req.body;

    if(!tekst) return res.status(400).json({ message: "Tekst komentarza jest wymagany!" });

    const post = await Post.findById(id);
    if(!post) return res.status(404).json({ message: "Post nie znaleziony!" });

    post.komentarze.push({
        uzytkownik: uzytkownikId,
        tekst
    });

    await post.save()
        .then(async (updatedPost) => {
            const populatedPost = await Post.findById(updatedPost._id)
                .populate('uzytkownik', 'nazwa')
                .populate('komentarze.uzytkownik', 'nazwa');
            res.status(200).json({ message: "Dodano komentarz!", post: populatedPost });
        })
        .catch((err) => res.status(500).json({ message: "Błąd podczas dodawania komentarza!", error: err }));
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

        await post.save()
            .then(async (updatedPost) => {
                const populatedPost = await Post.findById(updatedPost._id)
                    .populate('uzytkownik', 'nazwa')
                    .populate('komentarze.uzytkownik', 'nazwa');
                res.status(200).json({ message: "Post zaktualizowany pomyślnie!", post: populatedPost });
            });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas edycji posta!", error: err });
    }
});

module.exports = router;