const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticate } = require('../middleware/authMiddleware');

// Create comment on post
router.post('/:postId', authenticate, commentController.createComment);

// Get all comments for a post
router.get('/:postId', commentController.getPostComments);

// Delete a comment
router.delete('/delete/:commentId', authenticate, commentController.deleteComment);

// Update a comment
router.put('/update/:commentId', authenticate, commentController.updateComment);
module.exports = router;

