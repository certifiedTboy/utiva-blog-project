import { createContext, useContext, useState, useEffect } from "react";
import type { IPost, User, Comment } from "@/lib/types";
import {
  useGetAllPostsMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
  useGetAllCommentsMutation,
} from "../apis/post-apis";
import { useGetAllUsersMutation } from "../apis/user-apis";
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
  totalUsers: number;
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
  totalUsers: 0,
  onDeleteComment: () => {},
  onDeletePost: () => {},
});

let tempPosts: IPost[] = [];
let tempUsers: User[] = [];
let tempComments: Comment[] = [];

export const AdminContextProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalDraftPosts, setTotalDraftPosts] = useState(0);
  const [totalPublishedPosts, setTotalPublishedPosts] = useState(0);
  const [totalReactions, setTotalReactions] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const { user, isAuthenticated } = useAuth();

  const [getAllPosts, { data, isSuccess }] = useGetAllPostsMutation();

  const [getAllUsers, { data: usersData, isSuccess: isUsersSuccess }] =
    useGetAllUsersMutation();

  const [getAllComments, { data: commentsData, isSuccess: isCommentsSuccess }] =
    useGetAllCommentsMutation();

  const [deletePost] = useDeletePostMutation();

  const [deleteComment] = useDeleteCommentMutation();

  const onDeleteComment = (commentId: string) => {
    const filteredComments = comments.filter(
      (comment) => comment._id !== commentId,
    );

    setComments(filteredComments);

    tempComments = filteredComments;

    deleteComment(commentId);
  };

  const onDeletePost = (postId: string) => {
    const filteredPosts = posts.filter((post) => post._id !== postId);

    setPosts(filteredPosts);
    tempPosts = filteredPosts;
    deletePost(postId);
  };

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
    if (isAuthenticated && user && user?.role === "admin") {
      if (tempComments.length === 0) {
        getAllComments(null);
      } else {
        setComments(tempComments);
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user && user?.role === "admin") {
      if (tempUsers.length === 0) {
        getAllUsers(null);
      } else {
        setUsers(tempUsers);
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

      setTotalPosts(fetchedPosts?.length ?? 0);
      setTotalReactions(totalReactions);
      setTotalViews(totalViews);
      setTotalComments(totalComments);
      setTotalDraftPosts(totalDraftPosts);
      setTotalPublishedPosts(totalPublishedPosts);

      setPosts(fetchedPosts);
      tempPosts = fetchedPosts;
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isCommentsSuccess && commentsData) {
      const comments = commentsData?.data?.comments?.map((comment: any) => {
        return {
          ...comment,
          id: comment._id,
          authorName: `${comment?.author?.firstName} ${comment?.author?.lastName}`,
          authorAvatar: comment?.author?.picture,
        };
      });

      setComments(comments);
      tempComments = comments;

      setTotalComments(commentsData?.data?.total);
    }

    if (isUsersSuccess && usersData) {
      const users = usersData?.data?.users?.map((user: any) => {
        return {
          ...user,
          id: user._id,
          name: `${user?.firstName} ${user?.lastName}`,
          avatar: user?.picture,
          role: user?.role,
        };
      });

      setUsers(users);
      tempUsers = users;

      setTotalUsers(usersData?.data?.total);
    }
  }, [commentsData, usersData, isCommentsSuccess, isUsersSuccess]);

  const value = {
    posts,
    comments,
    users,
    totalPosts,
    totalViews,
    totalComments,
    totalReactions,
    totalPublishedPosts,
    totalDraftPosts,
    totalUsers,
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
