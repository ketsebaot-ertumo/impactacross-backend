const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createPost, getAllPost, getPostById, getLatestPost, getPostForUser, updatePost, deletePost } = require('../controllers/publicationController');
const router = express.Router();

router.post('/',isAuthenticated, createPost)
router.get('/', getAllPost);
router.get('/:id', getPostById);
router.get('/latest', getLatestPost);
router.get('/user/:id', getPostForUser);
router.put('/:id',isAuthenticated, updatePost);
router.delete('/:id',isAuthenticated, deletePost)

module.exports = router;