const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 } // Document auto-deletes after 10 minutes (600 seconds)
});

const OTP = mongoose.model('OTP', OTPSchema, 'OTPs');
module.exports = OTP;