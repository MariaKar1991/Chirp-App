import { useCallback } from "react";
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";

/**
 * SidebarChirpButton component represents the button for creating a new chirp.
 * When clicked, it opens the login modal if the user is not authenticated.
 *
 * @returns {JSX.Element} The rendered SidebarChirpButton component.
 */
const SidebarChirpButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  /**
   * Callback function to handle the click event of the chirp button.
   * Opens the login modal if the user is not authenticated.
   */
  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  // Render the SidebarChirpButton component
  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
        transition
      "
      >
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          Chirp
        </p>
      </div>
    </div>
  );
};

export default SidebarChirpButton;
