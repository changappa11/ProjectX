const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Middleware to authenticate user
function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.redirect('/login');
    req.userId = decoded.userId;
    next();
  });
}

// Create Post
router.post('/posts', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file.path;
    const post = new Post({ user: req.userId, image, caption });
    await post.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Post creation failed');
  }
});

// Get Posts
router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').exec();
    res.render('index', { posts });
  } catch (error) {
    res.status(500).send('Fetching posts failed');
  }
});

// Like Post
router.post('/posts/:postId/like', authenticate, async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Liking post failed');
  }
});

// Comment on Post
router.post('/posts/:postId/comment', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    post.comments.push({ user: req.userId, text });
    await post.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Commenting failed');
  }
});

// Follow/Unfollow
router.post('/users/:userId/follow', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.userId);
    if (user.following.includes(req.userId)) {
      user.following.pull(req.userId);
      currentUser.following.pull(user._id);
    } else {
      user.following.push(req.userId);
      currentUser.following.push(user._id);
    }
    await user.save();
    await currentUser.save();
    res.redirect('/profile');
  } catch (error) {
    res.status(500).send('Follow/Unfollow failed');
  }
});

module.exports = router;
