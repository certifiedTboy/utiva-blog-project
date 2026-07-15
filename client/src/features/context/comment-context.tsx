import { createContext, useState, useEffect, useContext } from "react";
import { useGetCommentsByPostMutation } from "../apis/post-apis";
import type { Comment } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export interface CommentContextType {
  comments: Comment[];
  addComment: (
    comment: string,
    author: string,
    authorAvatar: string,
    postId: string,
    authorId: string,
  ) => void;
  addReply: (
    comment: string,
    author: string,
    authorAvatar: string,
    postId: string,
    parentId: string,
    authorId: string,
  ) => void;
  deleteComment: (commentId: string, postId: string) => void;
  deleteReply: (parentId: string, postId: string, replyId: string) => void;
  onGetComment: (postId: string) => void;
  commentToDelete: { comment: Comment | null; reason: string };
  isDeleteModalOpen: boolean;
  setCommentToDelete: (comment: Comment | null, reason: string) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const CommentContext = createContext<CommentContextType>({
  comments: [],
  addComment: () => {},
  addReply: () => {},
  deleteComment: () => {},
  deleteReply: () => {},
  onGetComment: () => {},
  commentToDelete: { comment: null, reason: "" },
  isDeleteModalOpen: false,
  setCommentToDelete: () => {},
  setIsDeleteModalOpen: () => {},
});

export const CommentContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [commentToDelete, setCommentToDelete] = useState<{
    comment: Comment | null;
    reason: string;
  }>({ comment: null, reason: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { toast } = useToast();

  const [
    getCommentsByPost,
    { data: commentData, isSuccess: commentIsSuccess },
  ] = useGetCommentsByPostMutation();

  useEffect(() => {
    if (commentData && commentIsSuccess) {
      setComments(
        commentData?.data?.map((comment: any) => {
          return {
            _id: comment._id,
            authorName: `${comment?.author?.firstName} ${comment?.author?.lastName}`,
            authorAvatar: comment?.author?.picture,
            content: comment?.content,
            authorId: comment?.author?._id,
            createdAt: comment?.createdAt,
            replies: comment?.replies?.map((reply: any) => {
              return {
                _id: reply._id,
                authorName: `${reply?.author?.firstName} ${reply?.author?.lastName}`,
                authorAvatar: reply?.author?.picture,
                content: reply?.content,
                authorId: reply?.author?._id,
                createdAt: reply?.createdAt,
                id: reply._id,
              };
            }),
          };
        }),
      );
    }
  }, [commentData, commentIsSuccess]);

  const addComment = (
    comment: string,
    author: string,
    authorAvatar: string,
    postId: string,
    authorId: string,
  ) => {
    const newComment: Comment = {
      _id: Math.random().toString(),
      authorName: author,
      postId,
      authorAvatar,
      content: comment,
      authorId,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments((prev) => [newComment, ...prev]);
    toast({ title: "Comment posted!" });
  };

  const addReply = (
    comment: string,
    author: string,
    authorAvatar: string,
    postId: string,
    parentId: string,
    authorId: string,
  ) => {
    const newReply: Comment = {
      _id: Math.random().toString(),
      authorName: author,
      postId,
      content: comment,
      createdAt: new Date().toISOString(),
      authorAvatar,
      authorId,
    };

    setComments((prev) =>
      prev.map((c) =>
        c._id === parentId ? { ...c, replies: [...c!?.replies!, newReply] } : c,
      ),
    );

    toast({ title: "Reply posted!" });
  };

  const deleteComment = (commentId: string, postId: string) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));

    toast({ title: "Comment deleted!" });
  };

  const deleteReply = (commentId: string, postId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? {
              ...c,
              replies: c?.replies?.filter((r) => r._id !== replyId),
            }
          : c,
      ),
    );

    toast({ title: "Reply deleted!" });
  };

  const value = {
    comments,
    addComment,
    addReply,
    deleteComment,
    deleteReply,
    onGetComment: (postId: string) => getCommentsByPost(postId),
    commentToDelete,
    setCommentToDelete: (comment: Comment | null, reason: string) => {
      setCommentToDelete({ comment, reason });
      setIsDeleteModalOpen(true);
    },
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export const useComments = () => {
  return useContext(CommentContext);
};
