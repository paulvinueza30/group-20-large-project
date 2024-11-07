import {
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
  ChartPieIcon,
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
  // Construct the image URL if the profilePic is a relative path
  const profilePicUrl = userProfile.profilePic
    ? `${process.env.REACT_APP_SERVER_URL}${userProfile.profilePic}` // Ensure the correct base URL
    : Logo;
  return (
    <div className="relative">
      <div
        className={`fixed inset-0 -z-10 block  dark:bg-gray-900${
          expanded ? "block sm:hidden" : "hidden"
        }`}
      />
      <aside
        className={`box-border h-screen transition-all ${
          expanded ? "w-5/6 sm:w-64" : "w-0 sm:w-20"
        }`}
      >
        <nav className="flex h-full md:h-[1000px] flex-col border-r bg-white dark:bg-gray-900 shadow-sm">
          <div className="flex items-center justify-between p-4 pb-2">
            <img
              src={profilePicUrl}
              className={`overflow-hidden transition-all ${
                expanded ? "w-10" : "w-0"
              }`}
              alt=""
            />
            <h1
              className={`overflow-hidden font-bold dark:text-white ${
                expanded ? "w-30" : "w-0"
              }`}
            >
              Group 20
            </h1>
            <div className={`${expanded ? "" : "hidden sm:block"}`}>
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
          </div>
          <ul className="flex-1 px-3">{children}</ul>
          <div className="flex border-t p-3 h-[100px]">
            <div
              className={`flex items-center justify-between overflow-hidden transition-all ${
                expanded ? "ml-3 w-52" : "w-0"
              }`}
            >
              <div>
                <a
                  href="/"
                  className="leading-4 flex items-center dark:text-white pb-4"
                >
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                  <h4 className="text-primary-500 pl-2">Log out</h4>
                </a>
                <div className="leading-4 flex items-center pt-2">
                  <label className="inline-flex items-center cursor-pointer float-end">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onClick={handleClick}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <div className=""></div>
                    <span className="ms-3 text-md font-semifold text-gray-900 dark:text-gray-300">
                      Light Mode
                    </span>
                  </label>
                </div>
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
    return saved ? JSON.parse(saved) : true; // default to true
  });

  useEffect(() => {
    sendSizeChange(expanded);
  }, [expanded, sendSizeChange]); // Call sendSizeChange when expanded changes

  const handleToggle = () => {
    setExpanded((prev: any) => {
      const newState = !prev;
      localStorage.setItem("navbarCollapsed", JSON.stringify(newState));
      return newState;
    });
  };

  const navBarItems = [
    {
      icon: <HomeIcon />,
      text: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <ChartBarSquareIcon />,
      subMenu: [
        {
          icon: <></>,
          text: "Deck Name 1",
          to: "/decks",
        },
        {
          icon: <></>,
          text: "Deck Name 2",
          to: "",
        },
      ],
      text: "Decks",
      to: "/decks",
    },
    {
      icon: <ChartPieIcon />,
      text: "Stats",
      to: "/stats",
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
