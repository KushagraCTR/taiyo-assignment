import React, { ReactNode } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface SideMenuHeaderProps {
  icon1: ReactNode;
  text: string;
  icon2: ReactNode;
}

export const SideMenuHeader: React.FC<SideMenuHeaderProps> = ({             
  icon1,
  text,
  icon2,
}) => {
  return (
    <div className="flex flex-row justify-between items-center h-[60px] border-b w-full px-3">
      <div className="flex flex-row items-center gap-2">
        {icon1}
        <span>{text}</span>
      </div>
      {icon2}
    </div>
  );
};

interface SideMenuTabsProps {
  icon1?: ReactNode;
  text: string;
  icon2?: ReactNode;
  navigation: string;
}

export const SideMenuTabs: React.FC<SideMenuTabsProps> = ({
  icon1,
  text,
  icon2,
  navigation
}) => {
  return (
    <Link to={`/${navigation}`}>
      <div className="flex flex-row justify-between items-center hover:bg-slate-700 h-[40px] w-full px-3 cursor-pointer">
        <div
          className={clsx("flex flex-row items-center gap-2", {
            "pl-6": !icon1,
          })}
        >
          {icon1}
          <span className="text-lg">{text}</span>
        </div>

        {icon2}
      </div>
    </Link>
  );
};
