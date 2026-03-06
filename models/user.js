const mongoose = require('mongoose');
const { useLayoutEffect } = require('react');

const UserSchema = new mongoose.Schema({
    nazwa: { type: String, required: true, unique: true },
    miasto: { type: String },
    email: { type: String, required: true, unique: true },
    posiadaneLicencje: { type: {idLicencji:{type:mongoose.Schema.Types.ObjectId,ref: 'Licencje'} , startLicencji:Date, koniecLicencji:Date} },
    iloscOpinii: { type: Number, default: 0 },
    ulubioneLowiska: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lowisko' }],
    czlonePZW: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;