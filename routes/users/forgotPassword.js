const express = require('express');
const router = express.Router();
const User = require('../../models/uzytkownik');
const OTP = require('../../models/otp');
const bcrypt = require('bcrypt');
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

// 1. Request Password Reset (Send OTP)
router.post("/send-otp", async (req, res) => {
    const { email, turnstileToken } = req.body;

    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
        return res.status(403).json({ message: "Robot verification failed! Please try again." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist." });
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
            subject: "Your Password Reset Code",
            text: `Your password reset code is: ${otpCode}. It expires in 10 minutes.`
        });

        res.status(200).json({ message: "Reset code sent to email." });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ error: "Failed to send reset code." });
    }
});

// 2. Verify OTP and Reset Password
router.post("/verify-reset", async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const validOtpRecord = await OTP.findOne({ email, otp });
        if (!validOtpRecord) {
            return res.status(400).json({ message: "Invalid or expired reset code." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.haslo = hashedPassword;
        await user.save();

        await OTP.deleteOne({ email });

        res.status(200).json({ message: "Password reset successfully." });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ error: "Failed to reset password." });
    }
});

module.exports = router;