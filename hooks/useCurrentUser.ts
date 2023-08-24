import useSWR from "swr";

import fetcher from "@/libs/fetcher";

/**
 * A custom hook for fetching the current user's data.
 *
 * @returns {{
 *   data: Record<string, any> | undefined,
 *   error: Error | null,
 *   isLoading: boolean,
 *   mutate: () => void
 * }} The hook returns an object containing the current user's data, error if any,
 * loading state, and a function to manually trigger a data refresh.
 */
const useCurrentUser = () => {
  /**
   * Fetches the current user's data using the SWR library.
   */
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
