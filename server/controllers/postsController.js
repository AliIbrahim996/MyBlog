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
  const { title, content, tags } = req.body;
  const author = req.user;
  const post = new Post({
    title,
    author,
    content,
    tags,
  });
  await post.save();
  return res.status(201).json({
    statusCode: 201,
    message: "Post created Successfully!",
    content: { post },
  });
};

const updatePostById = async (req, res, next) => {
  const { title, content, tags } = req.body;
  const existingPost = await Post.findById(req.params.id);
  if (existingPost.user != req.user)
    return res.status(401).json({
      statusCode: 401,
      message:
        "You are not allowed to updated post that belongs to other users!",
      content: null,
    });
  const author = req.user;
  const post = await Post.updateOne(existingPost, {
    title,
    author,
    content,
    tags,
  });
  return res.status(200).json({
    statusCode: 200,
    message: "Post updated successfully!",
    content: { post },
  });
};

const deletePostById = async (req, res, next) => {
  const existingPost = await Post.findById(req.params.id);
  if (existingPost.user != req.user)
    return res.status(401).json({
      statusCode: 401,
      message:
        "You are not allowed to delete post that belongs to other users!",
      content: null,
    });

  // Mongo stores the id as `_id` by default
  const result = await Post.deleteOne(existingPost);
  return res.status(200).json({
    statusCode: 200,
    message: `Deleted ${result.deletedCount} post(s)`,
    content: {},
  });
};

const searchForPost = async (req, res, next) => {
  const { searchTerm } = req.body;
  try {
    const posts = await Post.find({ $text: { $search: searchTerm } })
      .sort({ score: { $meta: "textScore" } }) // Sort by relevance score
      .select({ score: { $meta: "textScore" } }); // Include relevance score in the resultsF
    res.json({ statusCode: 200, content: posts });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for posts!" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
  deletePostById,
  searchForPost,
};
