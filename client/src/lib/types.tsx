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
