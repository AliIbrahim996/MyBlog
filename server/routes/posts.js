const express = require("express");
const route = express.Router();

const {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
  deletePostById,
} = require("../controllers/postsController");

// Get All posts
// GET /api/posts/
route.get("/", getAllPosts);

// Get post by id
// GET /api/posts/id
route.get("/:id", getPostById);

// Add new post
// POST BASE_URL/
route.post("/", addNewPost);

// Update post
// PUT BASE_URL/id
route.put("/:id", updatePostById);

// Delete post by id
// DELETE /api/posts/id
route.delete("/:id", deletePostById);

module.exports = route;
