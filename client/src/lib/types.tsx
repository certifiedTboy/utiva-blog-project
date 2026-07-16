export type Comment = {
  _id: any;
  postId: any;
  content: string;
  authorName: string;
  authorAvatar?: string;
  authorId?: string;
  createdAt: string;
  parentId?: number;
  replies?: Comment[];
};

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    picture?: string;
  };
  category: string;
  categoryName?: string;
  coverImageCredit: string;
  tags: string[];
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  readingTime: number;
  status: "published" | "draft";
  featured: boolean;
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Replies = {
  _id: number | string;
  content: string;
  authorAvatar?: string;
  authorName: string;
  createdAt: string;
  depth?: number;
  authorId: string;
  postId: any;
  parentId: string;
};
