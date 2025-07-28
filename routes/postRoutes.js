const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { authenticate } = require('../middlewares/authMiddleware');

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/', getAllPosts);

// Protected Routes
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
