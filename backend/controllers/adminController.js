const User = require('../models/User');
const File = require('../models/File');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all files
exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find().populate('owner', 'email');
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete file
exports.deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findById(fileId);

        if (!file) return res.status(404).json({ error: 'File not found' });

        await File.findByIdAndDelete(fileId);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
