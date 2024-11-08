import { useState, useEffect } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import ColorChange from "../components/dashboard/ColorChange";
import CreateDeck from "../components/dashboard/CreateDeck";
import RadarCharti from "../components/dashboard/RadarCharti";
import RecentDecks from "../components/dashboard/RecentDecks";
import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";
import CalendarWidget from "../components/dashboard/CalendarWidget/CalendarWidget";
function Dashboard() {
  // Use the context to get the user profile
  const { userProfile, updateColorPreferences } = useUserProfile();

  // State for primary and secondary colors
  const [Pcolor, setPColor] = useState<string>("#5C0B86"); // Default primary color
  const [Scolor, setSColor] = useState<string>("#BA72E2"); // Default secondary color

  // Set colors when user profile is available
  useEffect(() => {
    if (userProfile) {
      const { primary, secondary } = userProfile.colorPreferences;
      setPColor(primary);
      setSColor(secondary);
    }
  }, [userProfile]); // Only update colors when userProfile changes

  // Check if the user profile is loaded
  if (!userProfile) {
    return <div>Loading...</div>; // Loading state if profile hasn't been fetched yet
  }

  // Update the color preferences when either color changes
  const handlePrimaryColorChange = (color: string) => {
    setPColor(color);
    updateColorPreferences(color, Scolor); // Update context and backend
  };

  const handleSecondaryColorChange = (color: string) => {
    setSColor(color);
    updateColorPreferences(Pcolor, color); // Update context and backend
  };

  return (
    <>
      <div className="flex dark:bg-dark-secondary">
        {/* Sending just the primary color for the active state */}
        <SideGrid color={Pcolor} />
        <div className="w-full ml-20 mr-[30px] ">
          {/* Responsive grid */}
          <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <div className="pt-8 text-sm flex flex-colum text-gray-400">
                <HomeIcon className="h-[15px] w-[15px]" /> / Dashboard
              </div>
              <h1 className="font-bold text-2xl dark:text-white">Dashboard</h1>
            </div>

            {/* Radar chart with primary color */}
            <div className="col-span-2 row-span-4 col-start-1 row-start-2 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
              <RadarCharti color={Pcolor} />
            </div>

            {/* Create deck */}
            <div className="col-span-2 row-span-4 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
              <CreateDeck Pcolor={Pcolor} Scolor={Scolor} />
            </div>

            {/* Calendar  */}
            <div className="col-span-4 row-span-5 col-start-5 row-start-2 border-2 overflow-hidden">
              <CalendarWidget Pcolor={Pcolor} Scolor={Scolor} />
            </div>

            {/* Recent decks with both primary and secondary colors */}
            <div className="col-span-4 row-span-3 col-start-1 row-start-7 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
              <RecentDecks Pcolor={Pcolor} Scolor={Scolor} />
            </div>

            {/* Color Change component */}
            <div className="col-span-2 row-span-3 col-start-5 row-start-7 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
              <ColorChange
                Pcolor={Pcolor}
                setPColor={handlePrimaryColorChange} // Pass function to change primary color
                Scolor={Scolor}
                setSColor={handleSecondaryColorChange} // Pass function to change secondary color
              />
            </div>

            {/* Spacing at the bottom */}
            <div className="col-span-6 row-span-1 col-start-1 row-start-7 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
