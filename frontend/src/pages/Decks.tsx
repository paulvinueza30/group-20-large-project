import SideGrid from "../components/sidebar/SideGrid";
import { HomeIcon } from "@heroicons/react/24/outline";
import AddFlashcard from "../components/AddFlashcard";

import Flashcard from "../components/Flashcard";
import { useUserProfile } from "../context/UserProfileContext";
import { useParams } from "react-router-dom";

// TODO
function Decks() {
  const { categoryName } = useParams<{ categoryName: string }>();
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
      <div className="flex justify-start">
        <SideGrid color={Pcolor} />
        <div className="ml-20 mr-[30px] w-full">
          <div className="grid grid-cols-6 grid-rows-8 lg:gap-x-[30px] lg:gap-y-[30px] max-h-shv">
            <div className="col-span-6 row-span-1 col-start-1 row-start-1 h-1 ">
              <div className="pt-8 text-sm flex flex-colum text-gray-400">
                <HomeIcon className="h-[15px] w-[15px]" /> / Decks /{" "}
                {categoryName}
              </div>
              <h1 className="font-bold text-2xl dark:text-white">
                {categoryName}
              </h1>
            </div>
            <div className="col-span-3 row-span-1 col-start-5 row-start-2 float-end">
              <AddFlashcard />
            </div>
            <div className="col-span-4 row-span-4 col-start-2 row-start-3">
              <Flashcard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Decks;
