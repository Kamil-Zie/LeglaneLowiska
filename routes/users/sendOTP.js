const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const OTP = require('../../models/otp');
const nodemailer = require('nodemailer');
const { verifyTurnstileToken } = require('../../utils/Turnstile');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    }
});

router.post("/", async (req, res) => {
    const { email, turnstileToken } = req.body;

    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
        return res.status(403).json({ message: "Robot verification failed! Please try again." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await OTP.findOneAndUpdate(
            { email }, 
            { otp: otpCode, createdAt: Date.now() }, 
            { upsert: true, returnDocument: 'after' }
        );

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Legalne Łowiska Verification Code",
            text: `Your verification code is: ${otpCode}. It expires in 10 minutes.`
        });

        res.status(200).json({ message: "Verification code sent to email." });

    } catch (error) {
        res.status(500).json({ error: "Failed to send verification code." });
    }
});

module.exports = router;