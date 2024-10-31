const { Router } = require('express');
const {
    createPlayer,
    getPlayers,
    getPlayer,
    editPlayer,
    deletePlayer
} = require('../controllers/playerControllers');
const authMiddleware = require('../middleware/authMiddleware');
const archiver = require('archiver');
const path = require('path');
const Player = require('../models/playerModel'); // Adjust the path to your Player model if necessary

const router = Router();

router.post('/', authMiddleware, createPlayer);    // Protected route to create a player
router.get('/', getPlayers);                       // Public route to get all players
router.get('/:id', getPlayer);                     // Public route to get a single player by ID
router.patch('/:id', authMiddleware, editPlayer);  // Protected route to edit a player
router.delete('/:id', authMiddleware, deletePlayer); // Protected route to delete a player

// Route to download all player documents as a ZIP file
router.get('/:id/documents/download', async (req, res) => {
    const playerId = req.params.id;

    try {
        // Fetch the player and their documents
        const player = await Player.findById(playerId);
        const documents = player.documents; // Assuming this is an array of document paths

        // Create a ZIP archive
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set compression level
        });

        // Set the response to download the file
        res.attachment(`${player.name}_documents.zip`);

        archive.pipe(res);

        // Append each document to the ZIP
        documents.forEach((doc) => {
            const filePath = path.join(__dirname, '..', 'uploads', doc); // Adjust the file path as needed
            archive.file(filePath, { name: path.basename(doc) });
        });

        // Finalize the archive (this is when the file gets sent)
        await archive.finalize();
    } catch (error) {
        console.error('Error creating ZIP file:', error);
        res.status(500).send('Error downloading documents');
    }
});

module.exports = router;
