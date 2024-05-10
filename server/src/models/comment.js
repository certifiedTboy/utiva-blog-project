const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // blogId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "blog",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
