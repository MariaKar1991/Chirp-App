import useSWR from "swr";

import fetcher from "@/libs/fetcher";

/**
 * A custom hook to fetch user data based on a user's ID.
 *
 * This hook provides a convenient way to fetch and manage user data by utilizing the SWR library.
 *
 * @param {string} userId - The ID of the user to fetch data for.
 * @returns {Object} An object containing the user data, error, loading state, and mutate function.
 */
const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
