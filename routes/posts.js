const express = require("express");
const route = express.Router();

const Post = require("../models/post");

// Get All posts
route.get("/", async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: "desc" });
  return res.status(200).json({
    statusCode: 200,
    message: "Fetched All posts",
    content: { posts },
  });
});

// Get post by id
route.get("/:id", async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  return res.status(200).json({
    statusCode: 200,
    message: `Fetched post ${postId}`,
    content: {
      post: post || {},
    },
  });
});

// Add new post
route.post("/", async (req, res, next) => {
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
});

// Update post
route.put("/:id", async (req, res, next) => {
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
});


// Delete post by id
route.delete('/:id', async (req, res, next) => {
    // Mongo stores the id as `_id` by default
    const result = await Post.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      statusCode: 200,
      message: `Deleted ${result.deletedCount} post(s)`,
      content: {},
    });
  });
  
  module.exports = route;