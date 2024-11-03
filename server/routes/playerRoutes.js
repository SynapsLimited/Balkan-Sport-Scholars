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

// Create Player
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'documents', maxCount: 10 },
  ]),
  createPlayer
);

// Get All Players
router.get('/', getPlayers);

// Get Single Player
router.get('/:id', getPlayer);

// Edit Player
router.patch(
  '/:id',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'documents', maxCount: 10 },
  ]),
  editPlayer
);

// Delete Player
router.delete('/:id', authMiddleware, deletePlayer);

module.exports = router;
