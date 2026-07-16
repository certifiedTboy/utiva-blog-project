import { createContext, useState, useEffect, useContext } from "react";
import {
  useGetCommentsByPostMutation,
  useAddCommentToPostMutation,
  useDeleteCommentMutation,
} from "../apis/post-apis";
import type { Comment, Replies } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type DeleteReason = "delete-comment" | "delete-reply" | "none";

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
  commentToDelete: { comment: Comment | Replies | null; reason: DeleteReason };
  isDeleteModalOpen: boolean;
  setCommentToDelete: (
    comment: Comment | Replies | null,
    reason: DeleteReason,
  ) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const CommentContext = createContext<CommentContextType>({
  comments: [],
  addComment: () => {},
  addReply: () => {},
  deleteComment: () => {},
  deleteReply: () => {},
  onGetComment: () => {},
  commentToDelete: { comment: null, reason: "none" },
  isDeleteModalOpen: false,
  setCommentToDelete: () => {},
  setIsDeleteModalOpen: () => {},
});

export const CommentContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [commentToDelete, setCommentToDelete] = useState<{
    comment: Comment | Replies | null;
    reason: DeleteReason;
  }>({ comment: null, reason: "none" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { toast } = useToast();

  const [
    getCommentsByPost,
    { data: commentData, isSuccess: commentIsSuccess },
  ] = useGetCommentsByPostMutation();

  const [addCommentToPost] = useAddCommentToPostMutation();
  const [deleteCommentFromPost] = useDeleteCommentMutation();

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
      _id: Math.floor(Math.random() * 1000000).toString() + "-comment",
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

    addCommentToPost({
      content: comment,
      postId,
      parentId: null,
      tempId: newComment._id,
    });
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
      _id: Math.floor(Math.random() * 1000000).toString() + "-reply",
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

    // check this reply operation for newly created reply
    // the function is not being called
    addCommentToPost({
      content: comment,
      postId,
      parentId,
      tempId: newReply._id,
    });
  };

  const deleteComment = (commentId: string, postId: string) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));

    toast({ title: "Comment deleted!" });

    deleteCommentFromPost({ commentId, postId });
  };

  const deleteReply = (parentId: string, postId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === parentId
          ? {
              ...c,
              replies: c?.replies?.filter((r) => r._id !== replyId),
            }
          : c,
      ),
    );

    toast({ title: "Reply deleted!" });
    deleteCommentFromPost({ commentId: replyId, postId });
  };

  const value = {
    comments,
    addComment,
    addReply,
    deleteComment,
    deleteReply,
    onGetComment: (postId: string) => getCommentsByPost(postId),
    commentToDelete,
    setCommentToDelete: (
      comment: Comment | Replies | null,
      reason: DeleteReason,
    ) => {
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
