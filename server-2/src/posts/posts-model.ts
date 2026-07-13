import { Schema, model, type Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Schema.Types.ObjectId;
  category: string;
  tags: string[];
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  readingTime: number;
  status: "published" | "draft";
  featured: boolean;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    coverImage: { type: String },
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
  },
  { timestamps: true },
);

const Post: Model<IPost> = model<IPost>("post", postSchema);

export default Post;

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

export const Category: Model<ICategory> = model<ICategory>(
  "category",
  categorySchema,
);

export interface IComment extends Document {
  post: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  content: string;
  parent: Schema.Types.ObjectId | null;
}

const commentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: "post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "comment", default: null },
  },
  { timestamps: true },
);

export const Comment: Model<IComment> = model<IComment>(
  "comment",
  commentSchema,
);

export const REACTION_TYPES = ["like", "love", "clap", "fire", "wow"] as const;
export type ReactionType = (typeof REACTION_TYPES)[number];

export interface IReaction extends Document {
  post: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  type: ReactionType;
}

const reactionSchema = new Schema<IReaction>(
  {
    post: { type: Schema.Types.ObjectId, ref: "post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, enum: REACTION_TYPES, required: true },
  },
  { timestamps: true },
);

// Add a unique compound index to ensure a user can only have one reaction per post.
reactionSchema.index({ post: 1, author: 1 }, { unique: true });

export const Reaction: Model<IReaction> = model<IReaction>(
  "reaction",
  reactionSchema,
);
