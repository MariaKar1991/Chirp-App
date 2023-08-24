import useSWR from "swr";

import fetcher from "@/libs/fetcher";

/**
 * A custom hook to fetch a single post by its ID.
 *
 * This hook provides an easy way to fetch detailed information about a specific post.
 *
 * @param {string} postId - The ID of the post to fetch.
 * @returns {Object} An object containing the fetched post data, error, loading state, and a mutate function.
 */
const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
