const mongoose = require('mongoose');
const LowiskoSchema = new mongoose.Schema({
    nazwa: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    typeLowiska: { type: String, required: true },
    sredniaOcen: { type: Number, default: 0 },
    liczbaOcen: { type: Number, default: 0 },
    idOkreguPZW: {type: mongoose.Schema.Types.ObjectId, ref: 'OkregPZW', required: true}
});

const Lowisko = mongoose.model('Lowisko', LowiskoSchema, "Lowiska");
module.exports = Lowisko;