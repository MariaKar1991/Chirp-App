import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

/**
 * Props for the UserHero component.
 *
 * @typedef {Object} UserHeroProps
 * @property {string} userId - The ID of the user.
 */

interface UserHeroProps {
  userId: string;
}

/**
 * Component for rendering the hero section of a user's profile.
 *
 * @component
 * @param {UserHeroProps} props - Props containing the user's ID.
 */
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
