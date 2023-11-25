const Post = require("../models/post");

const getAllPosts = async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: "desc" });
  return res.status(200).json({
    statusCode: 200,
    message: "Fetched All posts",
    content: { posts },
  });
};

const getPostById = async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  return res.status(200).json({
    statusCode: 200,
    message: `Fetched post ${postId}`,
    content: {
      post: post || {},
    },
  });
};

const addNewPost = async (req, res, next) => {
  const { title, author, content, tags } = req.body;
  const post = new Post({
    title,
    author,
    content,
    tags,
  });
  await post.save();
  return res.status(201).json({
    statusCode: 201,
    message: "Post created Successfully",
    content: { post },
  });
};

const updatePostById = async (req, res, next) => {
  const { title, author, content, tags } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title,
    author,
    content,
    tags,
  });
  return res.status(200).json({
    statusCode: 200,
    message: "Update post",
    content: { post },
  });
};

const deletePostById = async (req, res, next) => {
  // Mongo stores the id as `_id` by default
  const result = await Post.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    statusCode: 200,
    message: `Deleted ${result.deletedCount} post(s)`,
    content: {},
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
  deletePostById,
};
