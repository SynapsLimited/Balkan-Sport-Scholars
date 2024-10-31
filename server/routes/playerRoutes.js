// routes/playerRoutes.js

const { Router } = require('express');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory for Vercel Blob
const upload = multer({ storage });

const {
  createPlayer,
  getPlayers,
  getPlayer,
  editPlayer,
  deletePlayer,
} = require('../controllers/playerControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

// For handling multiple file uploads (image and documents)
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'documents', maxCount: 10 },
  ]),
  createPlayer
);

router.get('/', getPlayers);
router.get('/:id', getPlayer);

router.patch(
  '/:id',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'documents', maxCount: 10 },
  ]),
  editPlayer
);

router.delete('/:id', authMiddleware, deletePlayer);

module.exports = router;
