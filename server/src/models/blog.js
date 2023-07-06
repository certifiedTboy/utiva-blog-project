const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    content: {
      type: String,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    user: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRead: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
