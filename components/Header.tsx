import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

/**
 * Props for the Header component.
 *
 * @typedef {Object} HeaderProps
 * @property {boolean} [showBackArrow] - Indicates whether to show the back arrow icon.
 * @property {string} label - The title to be displayed in the header.
 */
interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

/**
 * Component for rendering a header with an optional back arrow icon and a title.
 *
 * @component
 * @param {HeaderProps} props - Props for customizing the header's appearance and behavior.
 */
const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  /**
   * Handles the back arrow click event, navigating to the previous page.
   */
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={20}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
