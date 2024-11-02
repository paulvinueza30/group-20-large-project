import { useState } from "react";
import ColorChange from "../components/dashboard/ColorChange";
import CreateDeck from "../components/dashboard/CreateDeck";
import RadarCharti from "../components/dashboard/RadarCharti";
import RecentDecks from "../components/dashboard/RecentDecks";
import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";

// TODO: Add components
function Dashboard() {
  const [Pcolor, setPColor] = useState("#5C0B86");
  const [Scolor, setSColor] = useState("#BA72E2");

  return (
    <>
      <div className="flex">
        <SideGrid color={Pcolor} />
        <div className="w-full ml-20 mr-[30px] ">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh ">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <div className="pt-8 text-sm flex flex-colum text-gray-400">
                <HomeIcon className="h-[15px] w-[15px]" /> / Dashboard
              </div>
              <h1 className="font-bold text-2xl xl:pt-14 lg:text-md">
                Dashboard
              </h1>
            </div>
            <div className="col-span-2 row-span-3 col-start-1 row-start-2 bg-slate-100 rounded-xl shadow-md">
              <RadarCharti color={Pcolor} />
            </div>
            <div className="col-span-2 row-span-3 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md">
              <CreateDeck />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-2 border-2 ">
              Calendar
            </div>
            <div className="col-span-4 row-span-3 col-start-1 row-start-5 bg-slate-100 rounded-xl shadow-md">
              <RecentDecks Pcolor={Pcolor} Scolor={Scolor} />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-5 bg-slate-100 rounded-xl shadow-md">
              <ColorChange
                Pcolor={Pcolor}
                setPColor={setPColor}
                Scolor={Scolor}
                setSColor={setSColor}
              />
            </div>
            <div className="col-span-6 row-span-1 col-start-1 row-start-7 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
