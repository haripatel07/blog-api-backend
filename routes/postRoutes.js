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
const upload = require('../middlewares/upload');

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected Routes (require login)
router.post('/', authenticate, upload.single('image'), createPost);
router.put('/:id', authenticate, upload.single('image'), updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
