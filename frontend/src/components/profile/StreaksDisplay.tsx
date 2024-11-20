import { useState } from "react";
import Streak from "../../assets/streak.png";
import { useCategories } from "../../hooks/category/useCategories";
import { useUserProfile } from "../../context/UserProfileContext";

interface Category {
  name: string;
  streakCount: number;
}

function StreaksDisplay() {
  const { userProfile } = useUserProfile();
  const [refreshToken, setRefreshToken] = useState(0); // Initialize refreshToken state
  console.log(setRefreshToken);
  const { data: categories } = useCategories(!!userProfile, refreshToken);

  // Default values in case categories are empty or undefined
  const streakCounts = {
    topCategories: [] as Category[],
  };

  // Check if categories data exists and is an array
  if (categories && Array.isArray(categories)) {
    // Sort categories by streakCount in descending order
    const sortedCategories = categories
      .filter((category) => category.streakCount >= 0) // Filter out categories with no streak
      .sort((a, b) => b.streakCount - a.streakCount); // Sort by streakCount descending

    // Get the top 3 categories
    streakCounts.topCategories = sortedCategories.slice(0, 3);
  }

  return (
    <div className="grid grid-cols-3 row-span-4 h-full">
      <div className="col-span-3 auto-rows-[50px] row-start-1 ">
        <h2 className="text-center font-bold text-xl py-4 dark:text-white">
          Top 3 Streaks Display (WIP)
        </h2>
      </div>

      {/* Render the top 3 categories dynamically */}
      {streakCounts.topCategories.map((category, index) => (
        <div
          key={index}
          className="col-span-1 row-span-8 row-start-2 flex flex-col items-center"
        >
          <img src={Streak} alt="Streak icon" className="relative w-[10rem]" />
          <h1 className="text-2xl font-bold relative bottom-10 dark:text-white">
            {category.streakCount} days
          </h1>
          <p className="text-lg dark:text-white">{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default StreaksDisplay;
