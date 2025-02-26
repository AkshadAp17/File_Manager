const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadFile, getUserFiles, shareFile, downloadFile  ,getSharedFiles , verifyFilePassword} = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/user/:userId', getUserFiles);
router.post('/share', shareFile);
router.get('/download/:fileId', downloadFile);

// router.post('/share', shareFile);
router.get('/shared/:userId', getSharedFiles);

module.exports = router;

// const express = require('express');
// const { downloadFile } = require('../controllers/fileController');

// const router = express.Router();

// router.get('/download/:fileId', downloadFile);

// module.exports = router;



router.post('/verify-password', verifyFilePassword);

module.exports = router;
