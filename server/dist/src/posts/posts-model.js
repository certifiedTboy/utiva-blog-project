import { Schema, model } from "mongoose";
const postSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    coverImage: { type: String },
    coverImageCredit: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    category: {
        type: String,
        required: true,
    },
    tags: [{ type: String }],
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    reactionCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["published", "draft"],
        default: "draft",
    },
    featured: { type: Boolean, default: false },
}, { timestamps: true });
const Post = model("post", postSchema);
export default Post;
const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
});
export const Category = model("category", categorySchema);
const commentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "comment", default: null },
    tempId: { type: String, default: null },
}, { timestamps: true });
export const Comment = model("comment", commentSchema);
export const REACTION_TYPES = ["like", "love", "clap", "fire", "wow"];
const reactionSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, enum: REACTION_TYPES, required: true },
}, { timestamps: true });
// Add a unique compound index to ensure a user can only have one reaction per post.
reactionSchema.index({ post: 1, author: 1 }, { unique: true });
export const Reaction = model("reaction", reactionSchema);
