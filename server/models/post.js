const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  tags: { type: [String] },
  createdAt: { type: Date, default: Date.now },
  LastUpdatedAt: { type: Date, default: Date.now },
});

PostSchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

PostSchema.pre("update", (next) => {
  this.nowLastUpdatedAt = new Date();
  next();
});

module.exports = mongoose.model("Post", PostSchema);
