import { useLocation } from "react-router-dom"; // Import useNavigate
import SideGrid from "../components/sidebar/SideGrid";
import Flashcard from "../components/Flashcard";
import AddFlashcard from "../components/AddFlashcard";
import { useUserProfile } from "../context/UserProfileContext";
import { HomeIcon } from "@heroicons/react/24/outline";


function Review() {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return <div>Loading...</div>; // Loading state if profile hasn't been fetched yet
  }

  const Pcolor = userProfile.colorPreferences.primary;

  const location = useLocation();
  const categoryName = location.state?.categoryName || "Default Category"; // Fallback for categoryName

  return (
    <div className="flex">
      <SideGrid color={Pcolor} />
      <div className="w-full ml-20 mr-[30px]">
        <div className="grid grid-cols-6 auto-rows-[100px] gap-x-[30px] gap-y-[30px] max-h-svh">
          <div className="col-span-6">
          <div className="pt-8 text-sm flex flex-colum text-gray-400">
              <HomeIcon className="h-[15px] w-[15px]" /> / Review / {categoryName}
            </div>
            <h1 className="font-bold text-2xl dark:text-white">Reviewing {categoryName}</h1>
          </div>
          <div className="col-span-4 row-span-1 col-start-2 row-start-2">
            <AddFlashcard color={Pcolor} />
          </div>
          <div className="col-span-4 col-start-2 row-span-5 row-start-3 w-full">
            <Flashcard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
