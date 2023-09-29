import useSWR from "swr";

import fetcher from "@/libs/fetcher";

/**
 * A custom hook to fetch a list of users.
 *
 * This hook provides a convenient way to fetch and manage a list of users by utilizing the SWR library.
 *
 * @returns {Object} An object containing the list of users, error, loading state, and mutate function.
 */
const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
