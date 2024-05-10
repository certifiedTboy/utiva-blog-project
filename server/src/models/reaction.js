const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema(
  {
    reaction: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Reaction = mongoose.model("reaction", reactionSchema);
module.exports = Reaction;
