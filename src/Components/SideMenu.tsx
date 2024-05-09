import React from "react";
import { AiFillCaretUp } from "react-icons/ai";

import { FaCommentDollar, FaChartArea } from "react-icons/fa";
import { SideMenuTabs } from "./SideMenuTabs";
import clsx from "clsx";

interface SideMenuProps {
  showSideBar: boolean;
  toggleSideBar: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ showSideBar, toggleSideBar }) => {
  return (
    <div
      className={clsx(
        "flex flex-row w-1/7 min-w-[260px] bg-purple-950 top-0 left-0 pt-2 text-white fixed h-screen z-30 transition-transform duration-300 ease-in-out",
        {
          "transform translate-x-1000": showSideBar,
          "transform -translate-x-full": !showSideBar,
        }
      )}
    >
      {/* side menu buttons */}
      <div className="flex flex-col gap-2 w-full items-start justify-start px-2">
        <SideMenuTabs
          icon1={<FaCommentDollar />}
          text={"Available Data"}
          navigation={"contact"}
        />
        {/* <SideMenuTabs
          icon1={<AiFillContacts />}
          text={"Contact"}
          navigation={"contact"}
        /> */}
        <SideMenuTabs
          icon1={<FaChartArea />}
          text={"Chart"}
          navigation={"dummy"}
        />
        <SideMenuTabs icon1={<FaChartArea />} text={"Map"} navigation={"map"} />
      </div>

      {/* used for opening/closing drawer */}
      <button
        onClick={toggleSideBar}
        className="w-[66px] rotate-90 fixed flex items-center justify-center top-1/2 right-[-40px] bg-purple-950"
      >
        <AiFillCaretUp />
      </button>
    </div>
  );
};

export default SideMenu;
