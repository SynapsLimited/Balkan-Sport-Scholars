const { Router } = require('express');
const {
    createTransfer,
    getTransfers,
    getTransfer,
    editTransfer,
    deleteTransfer
} = require('../controllers/transferControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/', authMiddleware, createTransfer);
router.get('/', getTransfers);
router.get('/:id', getTransfer);
router.patch('/:id', authMiddleware, editTransfer);
router.delete('/:id', authMiddleware, deleteTransfer);

module.exports = router;
