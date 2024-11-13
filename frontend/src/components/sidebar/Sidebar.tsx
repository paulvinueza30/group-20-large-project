import {
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
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
        className={`box-border h-screen transition-all fixed top-0 left-0 z-50${
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
              className={`font-bold dark:text-white text-2xl tracking-wide ${
                expanded ? "block" : "hidden"
              }`}
            >
              Atama
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
            <div
              className={`flex flex-col items-start ${expanded ? "ml-3" : ""}`}
            >
              <a
                href="/"
                className="leading-4 flex items-center dark:text-white pb-4"
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                {expanded && <h4 className="text-lg pl-7">Log out</h4>}
              </a>
              <div className="flex items-center justify-between w-full">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onClick={handleClick}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-black"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full"></div>
                </label>
                {expanded && (
                  <span className="text-lg text-gray-800 ml-2 dark:text-white">
                    Light Mode
                  </span>
                )}
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
