const mongoose = require('mongoose');

const LicencjaSchema = new mongoose.Schema({
    idOkreguPZW: {type: mongoose.Schema.Types.ObjectId, ref: 'OkregPZW', required: true},
    czyCzlonekPZW: { type: Boolean, default: false },
    opis: { type: String },
    cena: { type: Number, required: true },
    czasTrwania: { type: Number, required: true }
});

const Licencja = mongoose.model('Licencja', LicencjaSchema, "Licencje");
module.exports = Licencja;