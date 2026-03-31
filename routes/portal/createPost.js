const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const { verifyToken } = require('../../utils/JWT_Token');

router.post("/", verifyToken, async (req, res) => {
    const { uzytkownik, ryba, rozmiar, waga, miejsce, opis, zdjecie } = req.body;
    
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
        zdjecie
    });

    await newPost.save()
        .then((post) => res.status(201).json({ message: "Post dodany pomyślnie!", post }))
        .catch((err) => res.status(500).json({ message: "Błąd podczas dodawania posta!", error: err }));
});

module.exports = router;