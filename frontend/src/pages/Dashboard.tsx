import { useState, useEffect } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import { useCategories } from "../hooks/category/useCategories";
import ColorChange from "../components/dashboard/ColorChange";
import CreateDeck from "../components/dashboard/CreateDeck";
import RadarCharti from "../components/dashboard/RadarCharti";
import RecentDecks from "../components/dashboard/RecentDecks";
import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";
import CalendarWidget from "../components/dashboard/CalendarWidget/CalendarWidget";

function Dashboard() {
  const { userProfile, updateColorPreferences } = useUserProfile();
  const { data: categories, error, loading, refreshCategories } = useCategories(!!userProfile);

  const [Pcolor, setPColor] = useState<string>("#5C0B86");
  const [Scolor, setSColor] = useState<string>("#BA72E2");

  useEffect(() => {
    if (userProfile) {
      const { primary, secondary } = userProfile.colorPreferences;
      setPColor(primary);
      setSColor(secondary);
    }
  }, [userProfile]);

  const handleCategoryCreated = () => {
    refreshCategories(); // Refresh categories list after creating a new deck
  };

  const handlePrimaryColorChange = (color: string) => {
    setPColor(color);
    updateColorPreferences(color, Scolor);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSColor(color);
    updateColorPreferences(Pcolor, color);
  };

  if (!userProfile || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  return (
    <div className="flex dark:bg-dark-secondary">
      <SideGrid color={Pcolor} />
      <div className="w-full ml-20 mr-[30px] ">
        <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
          <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
            <div className="pt-8 text-sm flex flex-colum text-gray-400">
              <HomeIcon className="h-[15px] w-[15px]" /> / Dashboard
            </div>
            <h1 className="font-bold text-2xl dark:text-white">Dashboard</h1>
          </div>

          <div className="col-span-2 row-span-4 col-start-1 row-start-2 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
            <RadarCharti Pcolor={Pcolor} categories={categories ?? []} />
          </div>

          <div className="col-span-2 row-span-4 col-start-3 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
            <CreateDeck Pcolor={Pcolor} Scolor={Scolor} onCategoryCreated={handleCategoryCreated} />
          </div>

          <div className="col-span-2 row-span-4 col-start-5 row-start-2 overflow-hidden bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary ">
            <ColorChange
              Pcolor={Pcolor}
              setPColor={handlePrimaryColorChange}
              Scolor={Scolor}
              setSColor={handleSecondaryColorChange}
            />
          </div>

          <div className="col-span-4 row-span-5 col-start-1 row-start-6 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
            <RecentDecks
              Pcolor={Pcolor}
              Scolor={Scolor}
              categories={categories ?? []}
            />
          </div>

          <div className="col-span-2 row-span-5 col-start-5 row-start-6 bg-slate-100 rounded-xl shadow-md dark:bg-dark-primary">
            <CalendarWidget Pcolor={Pcolor} Scolor={Scolor} />
          </div>

          <div className="col-span-6 row-span-1 col-start-1 row-start-7 "></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
