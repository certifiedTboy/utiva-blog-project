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

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
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
