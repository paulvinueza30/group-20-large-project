import CreateDeck from "../components/dashboard/CreateDeck";
import RadarCharti from "../components/dashboard/RadarCharti";
import RecentDecks from "../components/dashboard/RecentDecks";
import SideGrid from "../components/sidebar/SideGrid";

// TODO: Add components
function Dashboard() {
  return (
    <>
      <div className="flex">
        <SideGrid />
        <div className="w-full ml-20 mr-[30px] ">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh ">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <h1 className="font-bold text-4xl xl:pt-14 lg:pt-0 md:p-0 lg:text-md">Dashboard</h1>
            </div>
            <div className="col-span-2 row-span-3 col-start-1 row-start-2 bg-slate-100 rounded-xl ">
              <RadarCharti />
            </div>
            <div className="col-span-2 row-span-3 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl ">
              <CreateDeck />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-2 border-2 ">
              Calendar
            </div>
            <div className="col-span-4 row-span-3 col-start-1 row-start-5 bg-slate-100 rounded-xl">
              <RecentDecks />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-5 border-2 ">
              6
            </div>
            <div className="col-span-6 row-span-1 col-start-1 row-start-7 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
