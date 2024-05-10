const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: "User",
    },

    profilePicture: {
      type: String,
      default: "uploads/dummyImage.jpg",
    },

    about: {
      type: String,
    },
    followers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        username: String,
      },
    ],
    following: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        username: String,
      },
    ],
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
