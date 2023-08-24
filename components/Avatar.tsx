import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

/**
 * Props for the Avatar component.
 *
 * @typedef {Object} AvatarProps
 * @property {string} userId - The ID of the user.
 * @property {boolean} [isLarge] - Indicates whether the avatar should be displayed as large.
 * @property {boolean} [hasBorder] - Indicates whether the avatar should have a border.
 */
interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

/**
 * Component for rendering a user's avatar with optional features.
 *
 * @component
 * @param {AvatarProps} props - Props containing user ID and optional features.
 */
const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  /**
   * Event handler to navigate to the user's profile page.
   *
   * @param {Event} event - The click event.
   */
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      rounded-full 
      hover:opacity-90 
      transition 
      cursor-pointer
      relative
    `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
