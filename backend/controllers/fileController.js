const File = require('../models/File');
const path = require('path');

// Upload a file
// exports.uploadFile = async (req, res) => {
//     try {
//         const { userId } = req.body; // Get userId from frontend
//         const newFile = new File({
//             filename: req.file.filename,
//             filepath: `/uploads/${req.file.filename}`,
//             owner: userId
//         });

//         await newFile.save();
//         res.json({ message: 'File uploaded successfully', file: newFile });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// Get user files
exports.getUserFiles = async (req, res) => {
    try {
        const { userId } = req.params;
        const files = await File.find({ owner: userId });
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Share file with another user
exports.shareFile = async (req, res) => {
    try {
        const { fileId, targetUserId } = req.body;
        const file = await File.findById(fileId);

        if (!file) return res.status(404).json({ error: 'File not found' });

        file.sharedWith.push(targetUserId);
        await file.save();
        res.json({ message: 'File shared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// const File = require('../models/File');

// Share a file with another user
exports.shareFile = async (req, res) => {
    try {
        const { fileId, targetUserId } = req.body;
        const file = await File.findById(fileId);

        if (!file) return res.status(404).json({ error: 'File not found' });

        // Prevent duplicate sharing
        if (!file.sharedWith.includes(targetUserId)) {
            file.sharedWith.push(targetUserId);
            await file.save();
        }

        res.json({ message: 'File shared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get files shared with the user
exports.getSharedFiles = async (req, res) => {
    try {
        const { userId } = req.params;
        const files = await File.find({ sharedWith: userId });
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        const { filename, filepath, owner, password } = req.body;

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newFile = new File({ filename, filepath, owner, password: hashedPassword });
        await newFile.save();

        res.status(201).json(newFile);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Verify password before accessing file
exports.verifyFilePassword = async (req, res) => {
    try {
        const { fileId, password } = req.body;
        const file = await File.findById(fileId);

        if (!file) return res.status(404).json({ error: 'File not found' });

        if (!file.password) {
            return res.json({ success: true, message: 'No password required' });
        }

        const isMatch = await bcrypt.compare(password, file.password);
        if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

        res.json({ success: true, message: 'Access granted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Serve file for download
exports.downloadFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findById(fileId);

        if (!file) return res.status(404).json({ error: 'File not found' });

        // Send the file for download
        res.download(path.join(__dirname, '..', 'uploads', file.filename));
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

