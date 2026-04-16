const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

router.post("/", verifyToken, async (req, res) => {
    const { uzytkownik, ryba, rozmiar, waga, miejsce, opis, zdjecie, sharedPost } = req.body;
    
    if(!uzytkownik || !ryba || !rozmiar || !waga || !miejsce) {
        return res.status(400).json({ message: "Wszystkie wymagane pola muszą być wypełnione!" });
    }

    const newPost = new Post({
        uzytkownik,
        ryba,
        rozmiar,
        waga,
        miejsce,
        opis,
        zdjecie,
        sharedPost
    });

    await newPost.save()
        .then((post) => res.status(201).json({ message: "Post dodany pomyślnie!", post }))
        .catch((err) => res.status(500).json({ message: "Błąd podczas dodawania posta!", error: err }));
});

router.post("/share/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { uzytkownik, opis } = req.body;

    try {
        const originalPost = await Post.findById(id);
        if(!originalPost) return res.status(404).json({ message: "Post nie znaleziony!" });

        const sharedPost = new Post({
            uzytkownik,
            ryba: originalPost.ryba,
            rozmiar: originalPost.rozmiar,
            waga: originalPost.waga,
            miejsce: originalPost.miejsce,
            opis: opis, // User's own comment when sharing
            sharedPost: originalPost._id
        });

        await sharedPost.save();
        res.status(201).json({ message: "Post udostępniony!", post: sharedPost });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas udostępniania posta!", error: err });
    }
});

module.exports = router;