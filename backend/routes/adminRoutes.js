const express = require('express');
const { getAllUsers, getAllFiles, deleteFile } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', verifyAdmin, getAllUsers);
router.get('/files', verifyAdmin, getAllFiles);
router.delete('/files/:fileId', verifyAdmin, deleteFile);

module.exports = router;
