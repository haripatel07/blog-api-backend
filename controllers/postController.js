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
  const { search = '', page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

    try {
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
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        totalPosts: posts.count,
        totalPages: Math.ceil(posts.count / limit),
        currentPage: parseInt(page),
        posts: posts.rows
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch posts', error });
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

