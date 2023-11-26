const express = require("express");
const route = express.Router();

const {
  getAllPosts,
  getPostById,
  addNewPost,
  updatePostById,
  deletePostById,
} = require("../controllers/postsController");

const {verifyToken} = require("../middleware/authIndex");

// Get All posts
// GET /api/version/posts/
route.get("/", getAllPosts);

// Get post by id
// GET /api/version/posts/id
route.get("/:id", getPostById);

// Add new post
// POST BASE_URL/
route.post("/", verifyToken, addNewPost);

// Update post
// PUT /api/version/posts/id
route.put("/:id", verifyToken, updatePostById);

// Delete post by id
// DELETE /api/version/posts/id
route.delete("/:id", verifyToken, deletePostById);

module.exports = route;
