const { Comment, Post, User } = require('../models');

// Create a comment
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      text,
      postId,
      userId: req.user.id
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment', error: err.message });
  }
};

// Get all comments for a post
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['username', 'email'] }]
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (req.user.id !== comment.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (req.user.id !== comment.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating comment', error: err.message });
  }
};