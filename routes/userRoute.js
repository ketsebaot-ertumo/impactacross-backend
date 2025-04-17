const express = require('express');
const { getAll, show, update, deleteUser, createUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();


router.post('/', isAuthenticated, createUser);
router.get('/', isAuthenticated, getAll);
router.get('/:userId?', isAuthenticated, show);
router.put('/:userId?',isAuthenticated, update);
router.delete('/:userId',isAuthenticated, deleteUser)

module.exports = router;