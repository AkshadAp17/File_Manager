const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.verifyAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Access denied' });
    }

    next();
};

module.exports = upload;
