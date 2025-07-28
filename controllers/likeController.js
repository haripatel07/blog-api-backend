const { Like } = require('../models');

const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      await existingLike.destroy();
      return res.status(200).json({ message: 'Post unliked' });
    } else {
      await Like.create({ userId, postId });
      return res.status(201).json({ message: 'Post liked' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error toggling like', error });
  }
};

module.exports = { toggleLike };
