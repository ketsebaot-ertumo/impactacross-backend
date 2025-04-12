const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
// const { createPost, getAllPost, getPostById, getPostForUser, updatePost, deletePost, getLatestPublicationPost } = require('../controllers/publicationController');
const publicationController = require("../controllers/publicationController");
const router = express.Router();

router.post('/',isAuthenticated, publicationController.createPost)
router.get('/', publicationController.getAllPost);
router.get('/latest', publicationController.getLatestPublicationPost);
router.get('/:id', publicationController.getPublicationPostById);
router.get('/user/:id', publicationController.getPostForUser);
router.put('/:id',isAuthenticated, publicationController.updatePublicationPost);
router.delete('/:id',isAuthenticated, publicationController.deletePublicationPost)

module.exports = router;