import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

/**
 * Props for the PostFeed component.
 *
 * @typedef {Object} PostFeedProps
 * @property {string} userId - The user's ID for filtering posts.
 */

/**
 * Component for rendering a feed of posts.
 *
 * @component
 * @param {PostFeedProps} props - Props containing the user's ID for filtering posts.
 */
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  /**
   * Fetch posts using the usePosts hook.
   *
   * @type {Array.<Object>}
   */
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
