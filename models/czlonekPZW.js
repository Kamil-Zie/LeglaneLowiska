const mongoose = require('mongoose');

const CzlonekPZWSchema = new mongoose.Schema({
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    okregPZW: {type: mongoose.Schema.Types.ObjectId, ref: 'OkregPZW', required: true},
    numerLegitymacji: { type: String, required: true, unique: true },
    dataWydania: { type: Date, required: true },
    dataWaznosci: { type: Date, required: true },
});

const CzlonekPZW = mongoose.model('CzlonekPZW', CzlonekPZWSchema, "CzlonkowiePZW");
module.exports = CzlonekPZW;