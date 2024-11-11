import {
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ChartBarSquareIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import Logo from "../../assets/logo.webp";
import { useLocation } from "react-router-dom";
import { useUserProfile } from "../../context/UserProfileContext";

interface SidebarProps {
  children: ReactNode;
  expanded: boolean;
  handleToggle: () => void;
}

function Sidebar({ children, expanded, handleToggle }: SidebarProps) {
  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  }

  const { userProfile } = useUserProfile();
  if (!userProfile) {
    return <div>Loading user information...</div>;
  }

  const profilePicUrl = userProfile.profilePic
    ? `${process.env.REACT_APP_SERVER_URL}${userProfile.profilePic}`
    : Logo;

  return (
    <div className="relative">
      <aside
        className={`box-border h-screen transition-all ${
          expanded ? "w-5/6 sm:w-64" : "w-0 sm:w-20"
        }`}
      >
        <nav className="flex h-full flex-col border-r bg-white dark:bg-dark-primary shadow-sm dark:border-dark-secondary">
          <div className="flex items-center justify-between p-4 pb-2">
            <img
              src={profilePicUrl}
              className={`transition-all ${expanded ? "w-10" : "w-0"}`}
              alt=""
            />
            <h1
              className={`font-bold dark:text-white ${
                expanded ? "block" : "hidden"
              }`}
            >
              Group 20
            </h1>
            <button
              onClick={handleToggle}
              className="rounded-lg bg-gray-50 dark:bg-gray-800 p-1.5 hover:bg-gray-100"
            >
              {expanded ? (
                <ArrowRightIcon className="h-6 w-6" />
              ) : (
                <ArrowLeftIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          <ul className="flex-1 px-3">{children}</ul>
          <div className="flex border-t p-3 h-[100px]">
            <div className={`flex items-center ${expanded ? "ml-3" : ""}`}>
              <a
                href="/"
                className="leading-4 flex items-center dark:text-white pb-4"
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                {expanded && <h4 className="text-primary-500 pl-2">Log out</h4>}
              </a>
              <div className="leading-4 flex items-center pt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onClick={handleClick}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
                  {expanded && (
                    <span className="ms-3 text-md text-gray-900 dark:text-gray-300">
                      Light Mode
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeSidebar({ sendSizeChange, color }: any) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem("navbarCollapsed");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    sendSizeChange(expanded);
  }, [expanded, sendSizeChange]);

  const handleToggle = () => {
    setExpanded((prev: any) => {
      const newState = !prev;
      localStorage.setItem("navbarCollapsed", JSON.stringify(newState));
      return newState;
    });
  };

  // Commented out for now
  // const { data } = useCategories();
  const data = null;

  // const subMenuData = data?.map((category) => ({
  //   icon: <></>,
  //   text: category.name,
  //   to: `/decks/${category.name}`,
  // }));

  const navBarItems = [
    {
      icon: <HomeIcon />,
      text: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <ChartBarSquareIcon />,
      // subMenu: subMenuData,
      text: "Decks",
      to: "/decks",
    },
    {
      icon: <TrophyIcon />,
      text: "Achievements",
      to: "/achievements",
    },
    {
      icon: <UserIcon />,
      text: "Profile",
      to: "/profile",
    },
  ];

  return (
    <Sidebar expanded={expanded} handleToggle={handleToggle}>
      {navBarItems.map((item, index) => (
        <SidebarItem
          key={index}
          expanded={expanded}
          {...item}
          active={location.pathname === item.to}
          color={color}
        />
      ))}
    </Sidebar>
  );
}
