const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nazwa: { type: String, required: true, unique: true },
    miasto: { type: String },
    email: { type: String, required: true, unique: true },
    haslo: { type: String, required: true },
    opis: { type: String, default: "" },
    nrKartyPZW: { type: String, default: "" },
    punkty: { type: Number, default: 0 },
    lokalizacja: { type: String, default: "" },
    posiadaneLicencje: [{ type: {idLicencji:{type:mongoose.Schema.Types.ObjectId,ref: 'Licencje'} , startLicencji:Date, koniecLicencji:Date} }],
    iloscOpinii: { type: Number, default: 0 },
    ulubioneLowiska: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lowisko' }],
    czlonePZW: { type: String, default: false },
    createdAt: { type: Date, default: Date.now },
    rola: { type: String, default: "user" }
});

const User = mongoose.model('Uzytkownik', UserSchema, "Uzytkownicy");
module.exports = User;