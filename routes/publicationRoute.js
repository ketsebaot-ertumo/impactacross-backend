const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createPost, getAllPost, getPostById, getLatestPost, getPostForUser, updatePost, deletePost } = require('../controllers/publicationController');
const router = express.Router();

router.post('/create',isAuthenticated, createPost)
router.get('/', getAllPost);
router.get('/:id', getPostById);
router.get('/search/latest', getLatestPost);
router.get('/search/user/:id', getPostForUser);
router.put('/edit/:id',isAuthenticated, updatePost);
router.delete('/delete/:id',isAuthenticated, deletePost)

module.exports = router;