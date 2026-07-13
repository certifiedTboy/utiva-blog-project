export type Comment = {
  id: number;
  postId: number;
  content: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  parentId?: number;
  replies: Comment[];
};

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
  tags: string[];
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  readingTime: number;
  status: "published" | "draft";
  featured: boolean;
  isReactedTo: boolean;
  createdAt: string;
  updatedAt: string;
}
