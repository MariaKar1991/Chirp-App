import useSWR from "swr";

import fetcher from "@/libs/fetcher";

/**
 * A custom hook to fetch a list of posts, either for a specific user or all users.
 *
 * This hook simplifies the process of fetching posts based on user ID or retrieving all posts.
 *
 * @param {string} userId - Optional. The ID of the user whose posts are to be fetched.
 * @returns {Object} An object containing the fetched posts data, error, loading state, and a mutate function.
 */
const usePosts = (userId?: string) => {
  /**
   * Constructs the URL for fetching posts based on whether a user ID is provided.
   */
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  /**
   * Fetches posts data using SWR.
   */
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
