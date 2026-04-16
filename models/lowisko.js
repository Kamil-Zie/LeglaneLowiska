const mongoose = require('mongoose');
const LowiskoSchema = new mongoose.Schema({
    nazwa: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    typeLowiska: { type: String},
    oceny: [{
        uzytkownik: { type: mongoose.Schema.Types.ObjectId, ref: 'Uzytkownik' },
        ocena: { type: Number, required: true, min: 1, max: 5 }
    }],
    sredniaOcen: { type: mongoose.Schema.Types.Double, default: 0 },
    iloscOcen: { type: Number, default: 0 },
    idOkreguPZW: {type: String, ref: 'OkregPZW'}
});

const Lowisko = mongoose.model('Lowisko', LowiskoSchema, "Lowiska");
module.exports = Lowisko;