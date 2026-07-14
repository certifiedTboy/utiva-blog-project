import { createContext, useState, useEffect, useContext } from "react";
import { useGetPublishedPostsMutation } from "../apis/post-apis";
import { CATEGORIES } from "@/lib/mock-data";
import type { IPost } from "@/lib/types";

export interface PostContextType {
  posts: IPost[];
  post: IPost | null;
  categories: { id: number; name: string; postCount: number }[];
  viewPostsDetails: (id: string) => void;
}

const PostContext = createContext<PostContextType>({
  posts: [],
  categories: [],
  post: null,
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
        id: post._id, // The original post.category is the categoryId
        categoryName:
          CATEGORIES.find((cat) => cat.id.toString() === post.category)?.name ??
          "", // Add categoryName
      }));

      setPosts(fetchedPosts);
      tempPosts = fetchedPosts;

      // Calculate post counts for each category
      const categoryCounts = new Map<string, number>(); // Counts based on category ID
      fetchedPosts.forEach((post) => {
        const categoryId = post.category; // Use the original category ID
        if (categoryId) {
          categoryCounts.set(
            categoryId,
            (categoryCounts.get(categoryId) || 0) + 1,
          );
        }
      });

      setCategories((prevCategories) =>
        prevCategories.map((cat) => ({
          ...cat,
          postCount: categoryCounts.get(cat.id.toString()) || 0,
        })),
      );
    }
  }, [data, isSuccess]);

  const viewPostsDetails = (slug: string) => {
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      !post.isViewed && post.viewCount++;
      post.isViewed = true;
      setPost(post);
      setPosts([...posts]);
    }
  };

  const value = {
    posts,
    post,
    categories,
    viewPostsDetails,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => {
  return useContext(PostContext);
};
