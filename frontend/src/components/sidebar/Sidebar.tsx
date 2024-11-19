import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
  ChartBarSquareIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";
import Logo from "../../assets/logo.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfile } from "../../context/UserProfileContext";
import { logoutUser } from "../../services/userApi";

interface SidebarProps {
  children: React.ReactNode;
  expanded: boolean;
  handleToggle: () => void;
}

function Sidebar({ children, expanded, handleToggle }: SidebarProps) {
  // Add state for tracking dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.theme === "dark";
  });

  // Sync theme changes with localStorage and document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      document.cookie = "connect.sid=; Max-Age=0; path=/";
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  function handleClick() {
    // Toggle the isDarkMode state
    setIsDarkMode((prevMode) => !prevMode);
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
              alt="Profile"
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
                href="#"
                onClick={handleLogout}
                className="leading-4 flex items-center dark:text-white pb-4"
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                {expanded && (
                  <h4 className="text-lg pl-7 text-gray-800 dark:text-white">
                    Log out
                  </h4>
                )}
              </a>
              <div className="flex items-center justify-between w-full">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleClick} // Updated event handler
                    checked={isDarkMode} // Controlled input state
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

  // Placeholder for navBar items and profile info
  const navBarItems = [
    { icon: <HomeIcon />, text: "Dashboard", to: "/dashboard" },
    { icon: <ChartBarSquareIcon />, text: "Decks", to: "/decks" },
    { icon: <TrophyIcon />, text: "Achievements", to: "/achievements" },
    { icon: <UserIcon />, text: "Profile", to: "/profile" },
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
