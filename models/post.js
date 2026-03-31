const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    uzytkownik: { type: mongoose.Schema.Types.ObjectId, ref: 'Uzytkownik', required: true },
    ryba: { type: String, required: true },
    rozmiar: { type: Number, required: true }, // in cm
    waga: { type: Number, required: true }, // in kg
    miejsce: { type: String, required: true },
    opis: { type: String },
    zdjecie: { type: String }, // optional photo URL or base64
    polubienia: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Uzytkownik' }],
    komentarze: [{
        uzytkownik: { type: mongoose.Schema.Types.ObjectId, ref: 'Uzytkownik' },
        tekst: { type: String, required: true },
        data: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema, "Posty");
module.exports = Post;