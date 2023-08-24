import React from "react";

import FollowBar from "../components/layout/FollowBar";
import Sidebar from "./layout/Sidebar";

/**
 * Props for the Layout component.
 *
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children - The content to be rendered within the layout.
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Component for defining the layout structure of the application.
 *
 * @component
 * @param {LayoutProps} props - Props for configuring the layout structure.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
          "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
