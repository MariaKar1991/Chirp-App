import { useRouter } from "next/router";
import { BsHypnotize } from "react-icons/bs";

/**
 * SidebarLogo component represents the logo in the sidebar.
 * When clicked, it navigates to the home page.
 *
 * @returns {JSX.Element} The rendered SidebarLogo component.
 */
const SidebarLogo = () => {
  // Initialize the router instance for navigation
  const router = useRouter();

  // Render the SidebarLogo component
  return (
    <div
      onClick={() => router.push("/")}
      className="
  rounded-full 
  h-14
  w-14
  p-4 
  flex 
  items-center 
  justify-center 
  hover:bg-blue-300 
  hover:bg-opacity-10 
  cursor-pointer
  transition
"
    >
      <BsHypnotize size={28} color="aqua" />
    </div>
  );
};

export default SidebarLogo;
