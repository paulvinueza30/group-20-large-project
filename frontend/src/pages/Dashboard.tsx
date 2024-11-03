import { useState } from "react";
import ColorChange from "../components/dashboard/ColorChange";
import CreateDeck from "../components/dashboard/CreateDeck";
import RadarCharti from "../components/dashboard/RadarCharti";
import RecentDecks from "../components/dashboard/RecentDecks";
import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";

// TODO: Add components
function Dashboard() {
  // Variables for the primary and secondary colors from the ChangeColor component
  const [Pcolor, setPColor] = useState("#5C0B86");
  const [Scolor, setSColor] = useState("#BA72E2");

  return (
    <>
      <div className="flex">
        {/* Sending just the primary color for the active state */}
        <SideGrid color={Pcolor} />
        <div className="w-full ml-20 mr-[30px] ">
          {/* I recommend using the 'auto-rows-[...px]' instead of row-span- for responsive purposes */}
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
              {/* Sending just the primary color */}
              <RadarCharti color={Pcolor} />
            </div>
            <div className="col-span-2 row-span-3 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md">
              <CreateDeck />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-2 border-2 ">
              Calendar
            </div>
            <div className="col-span-4 row-span-3 col-start-1 row-start-5 bg-slate-100 rounded-xl shadow-md">
              {/* Sending both colors to be used */}
              <RecentDecks Pcolor={Pcolor} Scolor={Scolor} />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-5 bg-slate-100 rounded-xl shadow-md">
              {/* This is the component that has the color picker, that is why we are using the setColor function */}
              <ColorChange
                Pcolor={Pcolor}
                setPColor={setPColor}
                Scolor={Scolor}
                setSColor={setSColor}
              />
            </div>
            {/* This is just to have a bit of spacing at the bottom of the page */}
            <div className="col-span-6 row-span-1 col-start-1 row-start-7 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
