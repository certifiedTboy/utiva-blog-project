import { createContext, useContext, useState, useEffect } from "react";
import type { IPost, User, Comment } from "@/lib/types";
import { useGetAllPostsMutation } from "../apis/post-apis";
import { useAuth } from "./auth-context";
import { CATEGORIES } from "@/lib/mock-data";

export interface IAdminContext {
  posts: IPost[];
  users: User[];
  comments: Comment[];
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  totalReactions: number;
  totalPublishedPosts: number;
  totalDraftPosts: number;
  onDeleteComment: (commentId: string) => void;
  onDeletePost: (postId: string) => void;
}

const AdminContext = createContext<IAdminContext>({
  posts: [],
  users: [],
  comments: [],
  totalPosts: 0,
  totalComments: 0,
  totalDraftPosts: 0,
  totalPublishedPosts: 0,
  totalReactions: 0,
  totalViews: 0,
  onDeleteComment: () => {},
  onDeletePost: () => {},
});

let tempPosts: IPost[] = [];

export const AdminContextProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [stats, setStats] = useState<{
    totalPosts: number;
    totalComments: number;
    totalDraftPosts: number;
    totalPublishedPosts: number;
    totalReactions: number;
    totalViews: number;
  }>({
    totalPosts: 0,
    totalComments: 0,
    totalDraftPosts: 0,
    totalPublishedPosts: 0,
    totalReactions: 0,
    totalViews: 0,
  });

  const { user, isAuthenticated } = useAuth();

  const [getAllPosts, { data, isSuccess }] = useGetAllPostsMutation();

  const onDeleteComment = (commentId: string) => {};

  const onDeletePost = (postId: string) => {};

  useEffect(() => {
    if (isAuthenticated && user && user?.role === "admin") {
      if (tempPosts.length === 0) {
        getAllPosts(null);
      } else {
        setPosts(tempPosts);
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isSuccess && data) {
      const fetchedPosts: IPost[] = data?.data?.posts.map((post: IPost) => ({
        ...post,
        categoryName:
          CATEGORIES.find((cat) => cat.id.toString() === post.category)?.name ??
          "", // Add categoryName
      }));

      const totalReactions =
        fetchedPosts?.reduce(
          (prev, curr) => prev + (curr.reactionCount ?? 0),
          0,
        ) ?? 0;

      const totalComments =
        fetchedPosts?.reduce(
          (prev, curr) => prev + (curr.commentCount ?? 0),
          0,
        ) ?? 0;

      const totalViews =
        fetchedPosts?.reduce(
          (prev, curr) => prev + (curr?.viewCount ?? 0),
          0,
        ) ?? 0;

      const totalPublishedPosts =
        fetchedPosts?.filter((p: IPost) => p?.status === "published")?.length ??
        0;
      const totalDraftPosts =
        fetchedPosts?.filter((p: IPost) => p?.status === "draft")?.length ?? 0;

      setStats({
        ...stats,
        totalPosts: fetchedPosts?.length ?? 0,
        totalReactions,
        totalViews,
        totalComments,
        totalDraftPosts,
        totalPublishedPosts,
      });

      setPosts(fetchedPosts);
      tempPosts = fetchedPosts;
    }
  }, [isSuccess, data]);

  const value = {
    ...stats,
    posts,
    comments,
    users,
    onDeleteComment,
    onDeletePost,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
