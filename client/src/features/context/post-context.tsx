import { createContext, useState, useEffect, useContext } from "react";
import { useGetPublishedPostsMutation } from "../apis/post-apis";
import { CATEGORIES } from "@/lib/mock-data";
import type { IPost } from "@/lib/types";

export interface PostContextType {
  posts: IPost[];
  post: IPost | null;
  categories: { id: number; name: string; postCount: number }[];
  reactToPost: (id: string) => void;
  addCommentToPost: (id: string, comment: string) => void;
  viewPostsDetails: (id: string) => void;
}

const PostContext = createContext<PostContextType>({
  posts: [],
  categories: [],
  post: null,
  reactToPost: () => {},
  addCommentToPost: () => {},
  viewPostsDetails: () => {},
});

let tempPosts: IPost[] = [];

export const PostContextProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<IPost[]>(tempPosts);
  const [categories, setCategories] = useState(CATEGORIES);
  const [post, setPost] = useState<IPost | null>(null);

  const [getPublishedPosts, { data, isSuccess }] =
    useGetPublishedPostsMutation();

  useEffect(() => {
    if (tempPosts.length === 0) {
      getPublishedPosts(null);
    } else {
      setPosts(tempPosts);
    }
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      const fetchedPosts: IPost[] = data.data.posts.map((post: IPost) => ({
        ...post,
        isReactedTo: false,
        id: post._id,
        category:
          CATEGORIES.find((cat: any) => cat.id.toString() === post.category)
            ?.name ?? "",
      }));

      setPosts(fetchedPosts);
      tempPosts = fetchedPosts;

      // Calculate post counts for each category
      const categoryCounts = new Map<string, number>();
      fetchedPosts.forEach((post) => {
        const categoryName = post.category;
        if (categoryName) {
          categoryCounts.set(
            categoryName,
            (categoryCounts.get(categoryName) || 0) + 1,
          );
        }
      });

      setCategories((prevCategories) =>
        prevCategories.map((cat) => ({
          ...cat,
          postCount: categoryCounts.get(cat.name) || 0,
        })),
      );
    }
  }, [data, isSuccess]);

  const reactToPost = (id: string) => {};

  const addCommentToPost = (id: string, commentData: string) => {};

  const viewPostsDetails = (slug: string) => {
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      post.viewCount++;
      post.isReactedTo = true;
      setPost(post);
      setPosts([...posts]);
    }
  };

  const value = {
    posts,
    post,
    categories,
    reactToPost,
    addCommentToPost,
    viewPostsDetails,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => {
  return useContext(PostContext);
};
