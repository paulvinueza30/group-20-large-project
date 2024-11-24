import SideGrid from "../components/sidebar/SideGrid";
import {useState, useEffect} from "react"
import { useUserProfile } from "../context/UserProfileContext";
import useGetUserAchievements from "../hooks/achievement/useGetAchievement";
import pdt from "../assets/level1.png"
import FrameSelection from "../components/FrameSelection";


function Stats() {
  const levelicon = pdt;
  const { achievements, loading, error } = useGetUserAchievements();

  const [frame, setFrame] = useState<string>(() => {
    return localStorage.getItem("selectedFrame") || ""; // Get frame from localStorage or default to an empty string
  });



  useEffect(() => {
    if (frame) {
      localStorage.setItem("selectedFrame", frame); // Persist frame selection to localStorage
    }
  }, [frame]);
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return <div>Loading...</div>; // Loading state if profile hasn't been fetched yet
  }

  

  if (loading) {
    return <div>Loading...</div>;
  }



  const Pcolor = userProfile.colorPreferences.primary;

  const categorizeAchievements = {
    Player: achievements?.filter((ach) => ach.achievementId.type === "Player"),
    Deck: achievements?.filter((ach) => ach.achievementId.type === "Deck"),
    Streak: achievements?.filter((ach) => ach.achievementId.type === "Streak"),
  };
  
  return (
   <div className="flex">
        <SideGrid color={Pcolor} />
      <div className="flex w-full ml-20 ">
          <div className="grid grid-cols-6 auto-rows-[100px] gap-4 w-full">
            <div className=" h-full w-full col-span-6">
              <h1 className="font-bold text-2xl dark:text-white pt-14">
                Achievements
              </h1>
            </div>

            {/*Player Column*/}
            <div className = "flex flex-col col-span-[100px] col-start-1 row-span-6 ">
              {achievements && achievements.length > 0 ? (
                <ul className = "border-2 m-2 rounded-xl p-3">
                <h1 className = "flex flex-col items-center font-bold text-2xl dark:text-white">Player</h1>
                  {categorizeAchievements.Player?.map((ach) => (
                    <li key = {ach._id} >
                      <h3 className = "pt-6 pb-1 flex flex-col items-center text-lg dark:text-white">
                      {ach.achievementId.name}
                      </h3>
                      <div className = "flex items-center gap-4">
                        <div className = "flex-shrink-0">
                        <img className = "ml-3 items-center flex flex-col w-8 h-8" src = {levelicon}/>
                        </div>
                      </div>
                      <div className="w-36 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 self-center relative bottom-5 ml-12">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500 mb-2"
                          style={{ width: `${ach.progress}`}}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-2xl dark:text-white">
                    No achievements found
                </p>
                )}
                {error && (
                  <div className="text-xl dark:text-white">Error: {error}</div>
              )}
            </div>

            {/*Deck column*/}
            <div className = "flex flex-col col-span-1 col-start-3 row-span-6">
              {achievements && achievements.length > 0 ? (
                <ul className = "border-2 m-2 rounded-xl p-3">
                <h1 className = "flex flex-col items-center font-bold text-2xl dark:text-white">Deck</h1>
                  {categorizeAchievements.Deck?.map((ach) => (
                    <li key = {ach._id} >
                      <h3 className = "pt-6 pb-1 flex flex-col items-center text-lg dark:text-white">
                        {ach.achievementId.name}
                      </h3>
                      <div className = "flex items-center gap-4">
                        <div className = "flex-shrink-0">
                        <img className = "ml-3 items-center flex flex-col w-8 h-8" src = {levelicon}/>
                        </div>
                      </div>
                      <div className="w-36 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 self-center relative bottom-5 ml-12">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500 mb-2"
                          style={{ width: `${ach.progress}`}}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                  <p className="text-2xl dark:text-white">
                    No achievements found
                  </p>
                )}
                {error && (
                  <div className="text-xl dark:text-white">Error: {error}</div>
                )}
            </div>

            {/*Streak column*/}
            <div className = "flex flex-col col-span-1 col-start-5 row-span-6">
              {achievements && achievements.length > 0 ? (
                <ul className = "border-2 m-2 rounded-xl p-3">
                <h1 className = "flex flex-col items-center font-bold text-2xl dark:text-white">Streaks</h1>
                  {categorizeAchievements.Streak?.map((ach) => (
                    <li key = {ach._id} >
                      <h3 className = "pt-6 pb-1 flex flex-col items-center text-lg dark:text-white">
                        {ach.achievementId.name}
                      </h3>
                      <div className = "flex items-center gap-4">
                        <div className = "flex-shrink-0">
                        <img className = "ml-3 items-center flex flex-col w-8 h-8" src = {levelicon}/>
                        </div>
                      </div>
                      <div className="w-36 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 self-center relative bottom-5 ml-12">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500 mb-2"
                          style={{ width: `${ach.progress}`}}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-2xl dark:text-white">
                  No achievements found
                </p>
              )}
              {error && (
                <div className="text-xl dark:text-white">Error: {error}</div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Stats;
