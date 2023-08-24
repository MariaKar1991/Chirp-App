import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

/**
 * A custom hook to manage like/unlike functionality for a post.
 *
 * @param {Object} options - Options for the hook.
 * @param {string} options.postId - The ID of the post to like/unlike.
 * @param {string} options.userId - The ID of the user liking/unliking the post.
 * @returns {Object} An object containing information about the post's like status
 * and a function to toggle the like status.
 */
const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  /**
   * Indicates whether the current user has liked the specified post.
   */
  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  /**
   * Toggles the like status of the specified post.
   * If the current user is not logged in, the login modal will be displayed.
   * If the post is already liked, an unlike request is sent, and vice versa.
   * Updates relevant data and displays toast messages on success or failure.
   */
  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPosts,
    mutateFetchedPost,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
