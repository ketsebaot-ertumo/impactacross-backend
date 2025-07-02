const express = require('express');
const { getAll, show, update, deleteUser, createUser } = require('../controllers/userController');
const { protect } = require('../middleware/protect');
const router = express.Router();


router.post('/', protect, createUser);
router.get('/', getAll);
router.get('/:id?', show);
router.put('/id/:id?',protect, update);
router.delete('/:id',protect, deleteUser)

module.exports = router;