import { useLocation } from "react-router-dom"; // Import useNavigate
import SideGrid from "../components/sidebar/SideGrid";
import Flashcard from "../components/Flashcard";
import AddFlashcard from "../components/AddFlashcard";
import { useUserProfile } from "../context/UserProfileContext";

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
      <div className="flex w-full ml-20">
        <div className="grid grid-cols-6 grid-rows-8 lg:gap-x-[30px] lg:gap-y-[30px] max-h-shv">
          <div className=" h-full w-full col-span-6">
            <h1 className="font-bold text-2xl dark:text-white pt-14">
              Card Review For {categoryName}
            </h1>
          </div>
          <div className="col-span-3 row-span-1 col-start-7 row-start-2">
            <AddFlashcard color={Pcolor} />
          </div>
          <div className="col-span-6 col-start-2 row-span-5 row-start-3">
            <Flashcard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
