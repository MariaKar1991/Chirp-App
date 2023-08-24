import useSWR from "swr";

import fetcher from "@/libs/fetcher";

/**
 * A custom hook to fetch user notifications.
 *
 * This hook provides a convenient way to fetch notifications for a specific user.
 *
 * @param {string} [userId] - The ID of the user for whom to fetch notifications.
 * @returns {Object} An object containing the fetched notifications data, error, loading state, and a mutate function.
 */
const useNotifications = (userId?: string) => {
  /**
   * Constructs the URL for fetching notifications based on the user ID.
   */
  const url = userId ? `/api/notifications/${userId}` : null;

  /**
   * Fetches notifications data using SWR.
   */
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
