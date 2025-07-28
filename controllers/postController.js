const { Post, User, Comment, Like } = require('../models');
const { Op } = require('sequelize');

exports.createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await Post.create({
      title,
      content,
      imageUrl,
      userId: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'DESC', search = '' } = req.query;
    const offset = (page - 1) * limit;

    const posts = await Post.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { content: { [Op.iLike]: `%${search}%` } }
        ]
      },
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Comment },
        { model: Like }
      ],
      order: [['createdAt', sort]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      totalPosts: posts.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(posts.count / limit),
      posts: posts.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Comment },
        { model: Like }
      ]
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    post.title = title || post.title;
    post.content = content || post.content;
    post.imageUrl = imageUrl || post.imageUrl;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await post.destroy();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
};
