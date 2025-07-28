const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { toggleLike } = require('../controllers/likeController');

router.post('/:postId', authenticate, toggleLike);

module.exports = router;
