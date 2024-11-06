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
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="border-2 h-full w-full">Stats Page</div>
            <div className="border-2 h-full grid grid-rows-2">
              <div className="border">grid col 2 container</div>
              <div className="border flex-grow">grid col2 container 2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
