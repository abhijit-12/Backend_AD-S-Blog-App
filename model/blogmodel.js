const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Object, required: true },
  author: { type: String, required: true },
  coverimg: { type: String },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
