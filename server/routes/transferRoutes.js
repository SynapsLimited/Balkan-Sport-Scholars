const { Router } = require('express');
const {
  createTransfer,
  getTransfers,
  getTransfer,
  editTransfer,
  deleteTransfer,
} = require('../controllers/transferControllers');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory for Vercel Blob
const upload = multer({ storage });

const router = Router();

router.post('/', authMiddleware, upload.single('image'), createTransfer);
router.get('/', getTransfers);
router.get('/:id', getTransfer);
router.patch('/:id', authMiddleware, upload.single('image'), editTransfer);
router.delete('/:id', authMiddleware, deleteTransfer);

module.exports = router;
