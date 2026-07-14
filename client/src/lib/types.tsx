export type Comment = {
  _id: any;
  postId: any;
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
