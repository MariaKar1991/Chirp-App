import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>;
}

/**
 * Props for the CommentItem component.
 *
 * @typedef {Object} CommentItemProps
 * @property {Object} data - The comment data.
 */

/**
 * Component for rendering an individual comment.
 *
 * @component
 * @param {CommentItemProps} props - Props containing the comment data.
 */
const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  /**
   * Callback function to navigate to the user's profile page.
   *
   * @param {Event} ev - The click event.
   */
  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  /**
   * Calculate the time distance from the comment's creation date to now.
   *
   * @type {string|null}
   */
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
