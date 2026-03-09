const mongoose = require('mongoose');

const OkregPZWSchema = new mongoose.Schema({
    nazwa: { type: String, required: true }
});

const OkregPZW = mongoose.model('OkregPZW', OkregPZWSchema, "OkregiPZW");
module.exports = OkregPZW;