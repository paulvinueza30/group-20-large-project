import CreateDeck from "../components/dashboard/CreateDeck";
import RadarCharti from "../components/dashboard/RadarCharti";
import SideGrid from "../components/sidebar/SideGrid";

// TODO: Add components
function Dashboard() {
  return (
    <>
      <div className="flex">
        <SideGrid />
        <div className="flex w-full ml-20">
          <div className="grid grid-cols-6 grid-rows-7 gap-12 w-full">
            <div className="col-span-6">
              <h1 className="font-bold text-4xl pt-10">Dashboard</h1>
            </div>
            <div className="col-span-2 row-span-3 row-start-2 bg-slate-100 rounded-xl">
              <RadarCharti />
            </div>
            <div className="col-span-2 row-span-3 col-start-3 row-start-2 border-2 rounded-xl overflow-hidden">
              <CreateDeck />
            </div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-2 border-2">
              4
            </div>
            <div className="col-span-4 row-span-3 row-start-5 border-2">5</div>
            <div className="col-span-2 row-span-3 col-start-5 row-start-5 border-2">
              6
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
