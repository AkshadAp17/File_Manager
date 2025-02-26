const User = require('../models/User');
const sendOTP = require('../config/mailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup/Login (Send OTP)
exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) user = new User({ email });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
        await user.save();

        await sendOTP(email, otp);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Verify OTP & Login
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
