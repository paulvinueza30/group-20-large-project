import React from "react";
import { GoHome } from "react-icons/go";
import { PiCardsLight } from "react-icons/pi";
import { IoPieChartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

function Sidebar() {
  const layout = [
    { label: "Dashboard", icon: <GoHome size={30} />, to: "/" },
    { label: "Decks", icon: <PiCardsLight size={30} />, to: "/decks" },
    { label: "Stats", icon: <IoPieChartOutline size={30} />, to: "/" },
    { label: "Profile", icon: <CiUser size={30} />, to: "/profile" },
    { label: "Logout", icon: <IoIosLogOut size={30} />, to: "/" },
  ];

  return (
    <div className="flex flex-col p-2 bg-slate-200">
      <div className="pb-6 pt-2">Group 20 Flashcard app</div>
      {layout.map(({ icon, label, to }) => (
        <React.Fragment key={label}>
          <Link to={to}>
            <div className="p-5 flex flex-row">
              <span className="pr-2">{icon}</span>
              <button>{label}</button>
            </div>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Sidebar;
