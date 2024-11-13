import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  to: string;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
  color?: string;
}

interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded"> {
  expanded?: never;
  subMenu?: never;
}

function HoveredSubMenuItem({ icon, text, active, color }: SubMenuItemProps) {
  return (
    <div
      className={`my-2 rounded-md p-2${
        active ? "bg-gray-300" : " hover:bg-indigo-50"
      }`}
      style={{ backgroundColor: active ? color : undefined }}
    >
      <div className="flex items-center justify-center ">
        <span className="text-primary-500 h-6 w-6 ">{icon}</span>
        <span className="text-primary-500 ml-3 w-28 text-start">{text}</span>
        <div className="h-1" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function SidebarItem({
  icon,
  active = false,
  text,
  to,
  expanded = false,
  subMenu = null,
  color,
}: SidebarItemProps) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);

  // Calculate the height of the sub-menu assuming each item is 40px tall
  const subMenuHeight = expandSubMenu
    ? `${((subMenu?.length || 0) * 80 + (subMenu! && 15)).toString()}px`
    : 0;

  return (
    <>
      <li>
        <Link
          to={to}
          className={`
            group relative my-3 flex w-full cursor-pointer
            items-center rounded-md px-3 py-4 font-medium transition-colors
            dark:text-white
            ${active && !subMenu ? `text-white bg-primary` : "text-gray-600"}
            ${!expanded && "hidden sm:flex"}
          `}
          style={{
            backgroundColor: active && !subMenu ? color : undefined,
          }}
          onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
        >
          <span className="h-6 w-6 dark:text-white">{icon}</span>

          <span
            className={`overflow-hidden text-start transition-all ${
              expanded ? "ml-3 w-44" : "w-0"
            }`}
          >
            {text}
          </span>
          {subMenu && (
            <div
              className={`absolute right-2 h-4 w-4${
                expanded ? "" : "top-2"
              } transition-all ${expandSubMenu ? "rotate-90" : "rotate-0"}`}
            >
              <ChevronRightIcon />
            </div>
          )}

          {!expanded && (
            <div
              className={`
                text-primary-500 invisible absolute left-full ml-6 -translate-x-3
                rounded-md bg-secondary px-2 z-50
                py-1 text-sm opacity-20 transition-all
                group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 dark:text-white dark:bg-secondary
              `}
              style={{backgroundColor: color}}
            >
              {!subMenu
                ? text
                : subMenu.map((item, index) => (
                    <HoveredSubMenuItem
                      key={index}
                      text={item.text}
                      icon={item.icon}
                      to={"/"}
                      color={color}
                    />
                  ))}
            </div>
          )}
        </Link>
      </li>
      <ul
        className={`sub-menu pl-6`}
        style={{
          height: subMenuHeight,
        }}
      >
        {expanded &&
          subMenu?.map((item, index) => (
            <SidebarItem
              key={index}
              {...item}
              expanded={expanded}
              active={location.pathname === item.to}
              color={color}
            />
          ))}
      </ul>

      {/* Hover effect for background color */}
      <style>
        {`
          .group:hover {
            background-color: ${color};
          }
        `}
      </style>
    </>
  );
}
