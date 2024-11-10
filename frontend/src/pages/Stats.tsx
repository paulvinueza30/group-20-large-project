import SideGrid from "../components/sidebar/SideGrid";
import { useUserProfile } from "../context/UserProfileContext";

// TODO: Add components
// Honestly still not sure what will be displayed here
// Maybe indivudual decks stats like how Anki does
function Stats() {
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
        <div className="flex w-full ml-20">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-4 w-full">
            <div className=" h-full w-full col-span-6">
              <h1 className="font-bold text-2xl dark:text-white pt-14">
                Achievements
              </h1>
            </div>
            <div className="border-2 h-full col-span-2 row-span-6 col-start-1 row-start-2 ">
              Player
            </div>
            <div className="border-2 h-full col-span-2 row-span-6 col-start-3 row-start-2 ">
              Decks
            </div>
            <div className="border-2 h-full col-span-2 row-span-6 col-start-5 row-start-2 ">
              Streaks
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
