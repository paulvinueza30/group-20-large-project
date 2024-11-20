import SideGrid from "../components/sidebar/SideGrid";
import UserInfo from "../components/userInfo";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useUserProfile } from "../context/UserProfileContext";
import FrameSelection from "../components/FrameSelection";
import { useEffect, useState } from "react";

// TODO: Add components
// TODO: Add color attribute to todo and other stats
function Profile() {
  const [frame, setFrame] = useState<string>(() => {
    return localStorage.getItem("selectedFrame") || ""; // Get frame from localStorage or default to an empty string
  });

  useEffect(() => {
    if (frame) {
      localStorage.setItem("selectedFrame", frame); // Persist frame selection to localStorage
    }
  }, [frame]);
  const { userProfile } = useUserProfile();

  // Check if the user profile is loaded
  if (!userProfile) {
    return <div>Loading...</div>; // Loading state if profile hasn't been fetched yet
  }

  // Get the primary and secondary colors from the user profile
  const Pcolor = userProfile.colorPreferences.primary;
  const Scolor = userProfile.colorPreferences.secondary;
  return (
    <>
      <div className="flex">
        <SideGrid color={Pcolor} />
        <div className="w-full ml-20 mr-[30px]">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <div className="pt-8 text-sm flex flex-colum text-gray-400">
                <HomeIcon className="h-[15px] w-[15px]" /> / Profile
              </div>
              <h1 className="font-bold text-2xl dark:text-white">Profile</h1>
            </div>
            <div className="col-span-2 row-span-7 col-start-1 row-start-3 ">
              <UserInfo Pcolor={Pcolor} Scolor={Scolor} frame={frame} />
            </div>
            <div className="col-span-4 row-span-4 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
              <h2 className="text-center font-bold text-xl py-4 dark:text-white">
                Streaks Display
              </h2>
            </div>
            <div className="col-span-4 row-span-4 row-start-6 col-start-3 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
              <h2 className="text-center font-bold text-xl py-4 dark:text-white">
                <FrameSelection frame={frame} setFrame={setFrame} />
              </h2>
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
