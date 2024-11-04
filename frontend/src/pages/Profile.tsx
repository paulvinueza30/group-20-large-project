import RadarCharti from "../components/dashboard/RadarCharti";
import SideGrid from "../components/sidebar/SideGrid";
import TodoList from "../components/todo/TodoList";
import { HomeIcon } from "@heroicons/react/24/outline";
import UserInfo from "../components/userInfo";

// TODO: Add components
function Profile() {
  return (
    <>
      <div className="flex">
        <SideGrid />
        <div className="w-full ml-20 mr-[30px]">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <div className="pt-8 text-sm flex flex-colum text-gray-400">
                <HomeIcon className="h-[15px] w-[15px]" /> / Profile
              </div>
              <h1 className="font-bold text-2xl">Profile</h1>
            </div>
            <div className="col-span-2 row-span-4 col-start-1 row-start-2 bg-slate-100 rounded-xl shadow-md">
              <UserInfo />
            </div>
            <div className="col-span-2 row-span-4 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md">
              <RadarCharti />
            </div>
            <div className="col-span-2 row-span-4 col-start-5 row-start-2 bg-slate-100 rounded-xl shadow-md">
              <TodoList />
            </div>
            <div className="col-span-6 row-span-2 row-start-6 bg-slate-100 rounded-xl shadow-md">
              6
            </div>
            {/* This is just to have a bit of spacing at the bottom of the page */}
            <div className="col-span-6 row-span-1 col-start-1 row-start-8 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
